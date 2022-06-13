import { Injectable, Logger} from "@nestjs/common";
import * as externals from "../api/externals";
import * as config from "../config";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);


  async getToken(url:string, body: any): Promise<any> {
    const headers = {
        "Content-Type": 'application/x-www-form-urlencoded',
    }
    try{
      const bodyWithSecret = {
        ...body,
        client_secret: config.CLIENT_SECRET
      }
      const response = await externals.post(
        bodyWithSecret,
        url,
        headers
      );
      if (!response || !response.data.access_token) {
          throw new Error(
            ` auth: Error retrieving the Access Token: ${response.status}`
          );
      }

      return response.data;
  }
  catch(error){
    throw new Error("error");
  }
  }
  
}
