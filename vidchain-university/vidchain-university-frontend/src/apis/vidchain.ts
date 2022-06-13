import axios from "axios";
import * as config from "../config";
import { ICredentialData } from "../interfaces/ICredentialData";
import { strB64enc } from "../utils/utils";

/**
 * VIDCHAIN API REQUESTS
 * This requests can be performed even from the frontend because do not require any callback.
 */

// Simple axios post request
async function request(token: string, user: any, endpoint: string) {
  let authorization = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await axios.post(
      config.API_URL.concat(endpoint),
      user,
      authorization
    );
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response.data;
  } catch (error) {
    return "Error";
  }
}

// Get API authentication token
async function getAuthzToken() {
  const body = {
    grantType: config.grantType,
    assertion: strB64enc(config.Entity),
    scope: config.scope,
  };
  try {
    const response = await axios.post(`${config.API_URL}/sessions`, body);
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response.data.accessToken;
  } catch (error) {
    return "Error";
  }
}

// Request Verifiable Credential generation
async function generateVerifiableCredential(
  token: string,
  user: ICredentialData
) {
  const credentialRevocable = {
    credential: user, 
    options:{
      revocable: true
    }
  };
  return request(token, credentialRevocable, "/verifiable-credentials");
}

export { getAuthzToken, generateVerifiableCredential };
