import React, { Component } from "react";
import "./AppRedirect.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Redirect } from "react-router-dom";
import * as utils from "../../utils/utils";
import * as universityBackend from "../../apis/universityBackend";
import io from "socket.io-client";
import { Ring } from "react-spinners-css";
import * as config from "../../config";
import { strB64dec } from "../../utils/utils";

interface Props {
  history: any;
  location: any;
  match: any;
}

interface State {
  data: any;
  sessionId: string;
  type: string;
  did: string;
  socketSession: string;
}

class AppRedirect extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: {},
      socketSession: "",
      sessionId: "",
      type: "",
      did: ""
    };
  }

  async componentDidMount() {
    const sessionId = new URLSearchParams(this.props.location.search).get("sessionId");
    const type = new URLSearchParams(this.props.location.search).get("type");
    const did = new URLSearchParams(this.props.location.search).get("did");
    if(sessionId && type && did){
      
        this.setState({
          sessionId,
          type,
          did,
        });

        this.initiateSocket();
    }
  }


  async initiateSocket() {
    const socket = io(config.BACKEND_WS, {
      path: "/universityws",
      transports: ["websocket"],
    });
    

    socket.on("connect", () => {
      this.setState({
        socketSession: socket.id,
      });
      const socketClient = {
        did: this.state.did,
        clientId: this.state.socketSession,
        lastSessionId: this.state.sessionId,
      };
      socket.emit("whoami", socketClient);
    });

    socket.on("largeFamilyPresentation", (msg: any) => {
      console.log("arrived largeFamilyPresentation");
      let presentation = strB64dec(msg.data.decrypted);

      let details = utils.decodeJWT(presentation.verifiableCredential[0]);
      this.setState({
          data: details
      })
      /**
       *  This information is not used here, just want to login
       */
      this.goToProfile();
    });

    socket.on("bankCredentialPresentation", (msg: any) => {
      console.log("arrived bankCredentialPresentation");
      let presentation = strB64dec(msg.data.decrypted);

      let details = utils.decodeJWT(presentation.verifiableCredential[0]);
      this.setState({
          data: details
      })
      /**
       *  This information is not used here, just want to login
       */
      this.goToProfile();
    });
  }

  goToProfile() {
    const { did, data, type } = this.state;
    this.props.history.push({
      pathname: "/profile",
      state: {
        did: did,
        type: type,
        data: data,
        flowCompleted: true
      },
    });
  }

  render() {
    const { did } = this.state;
    if (did != null) {
      return(
      <div className="home">
        <Header></Header>
        <div className="contentCallback">
              <h4>{"Validating"}</h4>
              <div className="spinnerContainer">
                <Ring color="red" />
              </div>
              <p>We are processing your query...</p>
        </div>
        <div className="footer">
          <Footer></Footer>
        </div>
      </div>
     );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default AppRedirect;
