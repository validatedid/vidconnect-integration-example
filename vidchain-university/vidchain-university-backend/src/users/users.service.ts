import { Injectable, Logger, HttpStatus, HttpException } from "@nestjs/common";
import { SocketClient, SessionClient, UserSession, SessionData } from "../interfaces/dtos";
import Redis from "ioredis";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private readonly userRedis = new Redis({
    port: process.env.REDIS_PORT, 
    host: process.env.REDIS_URL,
    keyPrefix: "university-user:",
  });
  private readonly sessionRedis = new Redis({
    port: process.env.REDIS_PORT, 
    host: process.env.REDIS_URL,
    keyPrefix: "university-user-session:",
  });

  /**
   *  Store SocketClient, i.e. did - socketClient pair
   */
  async createUser(body: SocketClient): Promise<any> {
    try {
      await this.userRedis.set(body.did, JSON.stringify(body.value));
      const currentSession = await this.getUser(body.did);
      this.logger.debug("currentSession: " + JSON.stringify(currentSession));
      return "Successfully user session creation";
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error while creating the user",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createSession(body: SessionClient): Promise<any> {
    try {
      await this.sessionRedis.set(body.sessionId, JSON.stringify({}));

      const currentSession: UserSession = await this.getUser(body.did);
      const updatedSession: UserSession = {
        clientId: currentSession.clientId,
        lastSessionId: body.sessionId
      }
      await this.userRedis.set(body.did, JSON.stringify(updatedSession));
      return "Successfully session creation";
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error while creating the session",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async editSession(body: SessionData): Promise<any> {
    try {
      await this.sessionRedis.set(body.sessionId, JSON.stringify(body.data));
      return "Successfully session insertion";
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error updatind the session",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   *  Retrieve socket clientId
   */
  async getUser(did: string): Promise<any> {
    const user = await this.userRedis.get(did);
    return JSON.parse(user);
  }

   /**
   *  Retrieve socket clientId
   */
  async getSession(sessionId: string): Promise<any> {
    const session = await this.sessionRedis.get(sessionId);
    return JSON.parse(session);
  }
}