# ts-wallet-session

A small, dependency-free TypeScript library for handling wallet-based
sessions (e.g. after a user connects and signs in with a crypto wallet).

This is a learning / portfolio project — it's intentionally simple:
no external storage, no frameworks, just a small class you can drop
into any TypeScript or JavaScript project and extend as needed.

## Features

- `login(walletAddress)` — starts a session for a wallet address
- `logout()` — clears the current session
- `getSession()` — returns the current session, or `null`
- `saveTokens(accessToken, refreshToken)` — attaches tokens to the session
- `getAccessToken()` — returns the current access token, or `null`
- `isAuthenticated()` — `true` if a wallet is currently logged in

## Project structure

```
ts-wallet-session/
├── src/
│   ├── index.ts     # public entry point
│   ├── session.ts   # SessionManager class
│   └── types.ts     # Session / TokenPair types
├── package.json
├── tsconfig.json
└── README.md
```

## Install & build

```bash
npm install
npm run build
```

This compiles `src/` into `dist/` (plain JS + `.d.ts` type declarations).

## Usage

```ts
import { session } from "ts-wallet-session";

// 1. User connects their wallet, you get an address back
const walletAddress = "0xAbC123...";

// 2. Start a session
session.login(walletAddress);

console.log(session.isAuthenticated()); // true

// 3. After your backend verifies a signature, save the tokens it returns
session.saveTokens("access-token-abc", "refresh-token-xyz");

console.log(session.getAccessToken()); // "access-token-abc"
console.log(session.getSession());
// { walletAddress: "0xAbC123...", accessToken: "...", refreshToken: "...", createdAt: 169... }

// 4. Log out whenever needed
session.logout();

console.log(session.getSession()); // null
console.log(session.isAuthenticated()); // false
```

### Using your own instance

The `session` export above is a single shared instance, convenient for
apps with one logged-in wallet at a time. If you need more control
(e.g. multiple sessions, or easier testing), import the class directly:

```ts
import { SessionManager } from "ts-wallet-session";

const mySession = new SessionManager();
mySession.login("0xAbC123...");
```

## Notes

- Sessions are stored **in memory only** — they reset on page reload
  or process restart. Swap the internal storage in `session.ts` for
  `localStorage`, cookies, or a database if you need persistence.
- No signature verification, network calls, or wallet-connect logic
  is included here — this library only manages the *session state*
  after you've already authenticated the wallet elsewhere.

## License

MIT
