import { decode as atob, encode } from "base-64";
const jwtDecode = require("jwt-decode");

function randomString(length: number) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * Parse a JWT token
 */
function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function atobFunction(c) {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return "Error";
  }
}

function getUserDid(jwt: string): string {
  return parseJwt(jwt).sub;
}

function getIssuerDid(jwt: string): string {
  return parseJwt(jwt).did;
}

/**
 * Decodes a Base64 string in an UTF-8 string format
 * @param input Base64 encoded string to decode
 */
function strB64dec(input: any) {
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
function strB64enc(input: any) {
  try {
    return encode(JSON.stringify(input));
  } catch (error) {
    return null;
  }
}

function decodeJWT(token: any) {
  try {
    var tok = jwtDecode(token);
    return tok;
  } catch (Error) {
    return Error;
  }
}

function isMobileOrTablet() {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}

export {
  randomString,
  getUserDid,
  getIssuerDid,
  strB64dec,
  strB64enc,
  decodeJWT,
  isMobileOrTablet
};
