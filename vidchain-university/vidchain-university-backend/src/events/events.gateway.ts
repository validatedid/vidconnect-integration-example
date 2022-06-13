import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  MessageBody,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import axios from "axios";
import * as config from "./../config";
import { Logger } from "@nestjs/common";
import { extractVCfromPresentation } from "../utils/Util";

@WebSocketGateway({ path: "/universityws", transports: ["websocket"], cookie: false})
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger("EventsGateway");

  afterInit() {
    this.logger.log("Initialized!");
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected:     ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected:     ${client.id}`);
  }

  /**
   *  whoami ws message is used to store socket clientId -  did pair in a database so when the presentation is ready, the backend knows who has to aim the callback response.
   */
  @SubscribeMessage("whoami")
  async handleSesssion(@MessageBody() msg: any): Promise<void> {
    this.logger.log(
      `This message has been sent by ${msg.did} whose socket clientId is now ${msg.clientId}`
    );
    const body = {
      did: msg.did,
      value: {
        clientId: msg.clientId,
        lastSessionId: msg.sessionId
      }
    };
    //Store the user in DB
    if (body.value.clientId){
      await axios.post(config.BASE_URL + "/users", body);
    }
    //Check if value already exists, in the sessions DB. Meaning the VP has already been done
    const path = `${config.BASE_URL}/users/sessions`;
    const response = await axios.get(path.concat(msg.sessionId));
    this.logger.log(`From session got: ${JSON.stringify(response.data)}`);
    if(response.data){
      this.handlePresentationEvent(response.data);
    }
  }

  /**
   *  presentationReady message is used to trigger the response of a Verifiable presentation. Notice that the did of user is retrieved from the credential and the socket clientId from the backend database.
   */
  @SubscribeMessage("presentationReady")
  async handlePresentationEvent(@MessageBody() credential: any): Promise<any> {
    this.logger.log(`Credential presentation:    ${credential}`);
    const jwt = extractVCfromPresentation(credential);
    this.logger.log(`JWT:    ${JSON.stringify(jwt)}`);
    const id = JSON.stringify(jwt.vc ? jwt.vc.credentialSubject.id : jwt.credentialSubject.id);
    const did = `${id.substring(1, id.length - 1)}`;
    const path = `${config.BASE_URL}/users/`;
    console.log("Reach Redis at endpoint: " + path.concat(did));
    const response = await axios.get(path.concat(did));
    console.log(
      "RESPONSE " + JSON.stringify(response.data)
    );
    const clientId = response.data.clientId;
    console.log(
      "Retrived from Redis clientId " + clientId + " for user " + did
    );
    if(response.data.lastSessionId){
      const lastSessionId = response.data.lastSessionId;
      await axios.put(config.BASE_URL + "/sessions", {sessionId: lastSessionId, data: credential});
      console.log("Sessions db updated ");
    }
    
    //
    /**
     *  If different kind of presentations are handled by the backend entity, different messages should be emitted depending to avoid cross ws notifications
     */
    const type = JSON.stringify(jwt.vc ? jwt.vc.type[1] : jwt.type[1]);
    const presentation = type.substring(1, type.length - 1) ;

    switch (presentation) {
      case "LargeFamilyCard":
        this.wss.to(clientId).emit("largeFamilyPresentation", credential);
        break;
      case "BankAccountHolderCredential":
        this.wss.to(clientId).emit("bankCredentialPresentation", credential);
        break;   
      default:
        this.wss.to(clientId).emit("presentation", credential);
        break;
    }
  }
}
