import { SessionManager } from "./session";

export { SessionManager } from "./session";
export type { Session, TokenPair } from "./types";

/**
 * A ready-to-use default instance, for simple apps that only
 * need a single global session (most wallet-login use cases).
 *
 * If you need multiple independent sessions, import SessionManager
 * directly and create your own instance(s) instead.
 */
export const session = new SessionManager();
