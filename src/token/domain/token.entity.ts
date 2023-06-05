export enum TokenTypes {
  Session = 'session',
  Password = 'password',
  API = 'api',
}

export interface TokenEntity {
  token: string;
  type: TokenTypes;
  expiresAt?: string;
}
