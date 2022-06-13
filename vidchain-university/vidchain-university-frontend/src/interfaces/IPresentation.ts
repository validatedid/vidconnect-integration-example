export interface IPresentation {
  target: string;
  name?: string;
  type: string[][];
  redirectUri?: string;
}

export interface PresentationPayload {
  vp: Presentation;
  aud?: string;
  nbf?: number;
  exp?: number;
  jti?: string;
  [x: string]: any;
}

export interface Presentation {
  '@context': string[];
  type: string;
  verifiableCredential: string[] | VerifiableCredential[];
}

export interface VerifiableCredential extends Credential {
  issuer: string;
  issuanceDate: string;
  proof: Proof;
}

export interface Proof {
  type: string;
  created: string;
  proofPurpose: string;
  verificationMethod: string;
  jws: string;
  [x: string]: string;
}

export interface CredentialStatus {
  id: string;
  type: string;
}

export interface Credential {
  '@context': string[];
  id: string;
  type: string[];
  credentialSubject: CredentialSubject;
  issuer: string;
  issuanceDate?: string;
  expirationDate?: string;
  credentialStatus?: CredentialStatus;
  [x: string]: unknown;
}

export interface CredentialSubject {
  [x: string]: unknown;
}
