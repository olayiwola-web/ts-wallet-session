import { Session, TokenPair } from "./types";

/**
 * SessionManager keeps track of a single wallet session in memory.
 *
 * This is intentionally simple: no storage backend, no encryption,
 * no framework dependencies. It's meant as a learning-friendly
 * building block you can extend later (e.g. swap the in-memory
 * store for localStorage, cookies, or a database).
 */
export class SessionManager {
  // The current session, or null if nobody is logged in.
  private session: Session | null = null;

  /**
   * Starts a new session for the given wallet address.
   * Any previous session is overwritten.
   */
  login(walletAddress: string): Session {
    if (!walletAddress || walletAddress.trim().length === 0) {
      throw new Error("walletAddress is required to log in");
    }

    this.session = {
      walletAddress,
      createdAt: Date.now(),
    };

    return this.session;
  }

  /**
   * Clears the current session. Safe to call even if
   * nobody is logged in.
   */
  logout(): void {
    this.session = null;
  }

  /**
   * Returns the current session, or null if there isn't one.
   */
  getSession(): Session | null {
    return this.session;
  }

  /**
   * Attaches an access/refresh token pair to the current session.
   * Throws if there's no active session to attach tokens to.
   */
  saveTokens(accessToken: string, refreshToken: string): void {
    if (!this.session) {
      throw new Error("Cannot save tokens: no active session. Call login() first.");
    }

    this.session.accessToken = accessToken;
    this.session.refreshToken = refreshToken;
  }

  /**
   * Convenience helper for the tokens above, in case you want to
   * pass a TokenPair object instead of two separate strings.
   */
  saveTokenPair(tokens: TokenPair): void {
    this.saveTokens(tokens.accessToken, tokens.refreshToken);
  }

  /**
   * Returns the current access token, or null if there isn't one
   * (either no session, or tokens haven't been saved yet).
   */
  getAccessToken(): string | null {
    return this.session?.accessToken ?? null;
  }

  /**
   * Returns the current refresh token, or null if there isn't one.
   */
  getRefreshToken(): string | null {
    return this.session?.refreshToken ?? null;
  }

  /**
   * True if there's an active session with a wallet address logged in.
   * Note: this checks for a logged-in wallet, not specifically for
   * the presence of tokens — use getAccessToken() for that.
   */
  isAuthenticated(): boolean {
    return this.session !== null;
  }
}
