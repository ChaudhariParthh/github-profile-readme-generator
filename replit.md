# Running on Replit

- Runtime: Node.js 22 (TanStack Start requires Node.js >=22.12).
- Install dependencies with `npm ci`.
- The **Start application** workflow runs `npm run dev`.
- Vite listens on `0.0.0.0:5000` and accepts Replit's proxied preview hosts.
- Open `/` for the landing page and `/builder` for the README editor.
- No secrets or database are required. GitHub profile imports use the public GitHub API; its unauthenticated rate limits apply. External README widgets require network access.

## Checks

- `npm test` runs the existing Vitest suite.
- `npm run build` builds the existing TanStack Start SPA.
- Keep the existing React, TypeScript, TanStack, and Lovable configuration and follow `AGENTS.md`.
- `vite.config.github.ts` remains the separate GitHub Pages build configuration; the Replit preview uses `vite.config.ts`.
