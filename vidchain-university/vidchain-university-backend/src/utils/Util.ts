import * as jwtDecode from "jwt-decode";
import { decode as atob, encode } from "base-64";

function decodeJWT(token) {
  try {
    const tok = jwtDecode(token);
    return tok;
  } catch (Error) {
    return Error;
  }
}

/**
 * Parse a JWT token
 */
function parseJwt(token) {
  try {
    const tok = jwtDecode(token);
    return tok;
  } catch (Error) {
    return null;
  }
}

/**
 * Decodes a Base64 string in an UTF-8 string format
 * @param input Base64 encoded string to decode
 */
function strB64dec(input) {
  try {
    return JSON.parse(atob(input));
  } catch (error) {
    return null;
  }
}

/**
 * Encoded  a Base64 string in an UTF-8 string format
 * @param input Base64 encoded string to decode
 */
function strB64enc(input) {
  try {
    return encode(JSON.stringify(input));
  } catch (error) {
    return null;
  }
}

function extractVCfromPresentation(credential) {
  let jwtObject = strB64dec(credential.data.decrypted);
  return jwtObject.verifiableCredential[0];
}

export { decodeJWT, parseJwt, strB64dec, strB64enc, extractVCfromPresentation };
