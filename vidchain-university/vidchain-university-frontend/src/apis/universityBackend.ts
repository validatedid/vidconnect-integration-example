import axios from "axios";
import * as config from "../config";
import {IPresentation} from "../interfaces/IPresentation";

/**
* UNIVERSITY BACKEND REQUESTS 
The request of a Verifiable presentation should be handled in the backend so as to receive a response from the API in a callback
*/

async function claimVP(target: string, name: string, redirectUri: string) {
  let presentationType = [] as any;
  switch (name) {
    case "Login": {
      presentationType = ["VerifiableCredential", "VerifiableIdCredential"];
      break;
    }
    case "LargeFamilyCard": {
      presentationType = ["VerifiableCredential", "LargeFamilyCard"];
      break;
    }
    case "BankAccountHolderCredential": {
      presentationType = ["VerifiableCredential", "BankAccountHolderCredential"];
      break;
    }
    default: {
      break;
    }
  }
  const presentation: IPresentation = {
    target: target,
    name: name,
    type: [presentationType],
  };
  if(redirectUri != "") {
    presentation.redirectUri = redirectUri;
  }
  try {
    const response = await axios.post(
      `${config.BACKEND_URL}/presentation/request`,
      presentation
    );
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response.data;
  } catch (error) {
    return "Error";
  }
}

async function getToken(body: any) {
  try {
    const response = await axios.post(
      `${config.BACKEND_URL}/auth`,
      body
    );
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response.data;
  } catch (error) {
    return "Error";
  }
}

async function createSession(body: any) {
  try {
    const response = await axios.post(
      `${config.BACKEND_URL}/users/sessions`,
      body
    );
    if (response.status !== 200 && response.status !== 201) {
      return "Error";
    }
    return response.data;
  } catch (error) {
    return "Error";
  }
}

export { claimVP, getToken, createSession };
