export interface verifiableKYC {
  id: string;
  documentNumber: string;
  documentType: string;
  name: string;
  surname: string;
  fullName: string;
  nationality: string;
  stateIssuer: string;
  issuingAuthority: string;
  dateOfExpiry: string;
  dateOfBirth: string;
  placeOfBirth: string;
  sex: string;
  personalNumber: string;
}

export interface Presentation {
  target: string;
  name?: string;
  type: string[][];
}
