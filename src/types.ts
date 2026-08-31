/**
 * Represents an active wallet-based session.
 */
export interface Session {
  /** The wallet address that is currently logged in. */
  walletAddress: string;
  /** Optional access token issued after authentication. */
  accessToken?: string;
  /** Optional refresh token used to renew the access token. */
  refreshToken?: string;
  /** Unix timestamp (ms) of when the session was created. */
  createdAt: number;
}

/**
 * A simple pair of tokens returned by an auth server / backend
 * after a wallet signature has been verified.
 */
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
