import { ICredentialSubject } from "./ICredentialSubject";

export interface ICredentialData {
  type: any;
  issuer: string;
  id: string;
  credentialSubject: ICredentialSubject;
}
