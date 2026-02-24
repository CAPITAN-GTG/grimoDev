# AGENTS.md

## Cursor Cloud specific instructions

This is a single-page Next.js 15 marketing website (Grimo Dev) with no database and no external service dependencies beyond optional Gmail SMTP.

### Running the app

- `npm run dev` starts the dev server on `http://localhost:3000`
- `npm run build` builds for production
- `npm run lint` runs ESLint via `next lint`

### Key caveats

- **ESLint config**: `eslint.config.mjs` extends `next/core-web-vitals` and `next/typescript`. The existing codebase has pre-existing lint warnings/errors (unused imports, unescaped entities, empty interfaces). These do not block `npm run dev`.
- **Build with ESLint**: `next.config.ts` sets `eslint.ignoreDuringBuilds: true` because the pre-existing lint errors would otherwise fail `npm run build`.
- **Contact form email**: The `/api/send-email` route uses Nodemailer with Gmail SMTP. It requires `GMAIL_USER` and `APP_PASSWORD` environment variables to actually send emails. Without them, form submission will fail server-side but the client-side form logic still works.
- **No automated tests**: The project has no test framework or test files. `npm run lint` is the only automated check available.
- **No Docker/database**: All data (projects, FAQ, pricing) is hardcoded in source files. No external infrastructure needed.
