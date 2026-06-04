# Sigma Royal Server

Express, Prisma, and PostgreSQL API for the Sigma Royal company website.

## Local Development

```bash
npm ci
cp .env.example .env
npm run prisma:migrate
npm run dev
```

The local API runs on `http://localhost:4001` when `PORT=4001` is set in `.env`.

## Vercel Deployment

Import the `sigmaroyal-server` repository/project in Vercel and use these settings:

- Framework Preset: `Other`
- Root Directory: `sigmaroyal-server` if this is imported from the parent repo, otherwise leave it as the repository root
- Install Command: `npm ci`
- Build Command: `npm run vercel-build`
- Output Directory: leave empty

The Vercel build command runs Prisma Client generation, deploys existing migrations to the configured PostgreSQL database, then type-checks the API.

## Required Environment Variables

Set these in Vercel Project Settings > Environment Variables:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-this-password"
JWT_SECRET="replace-with-a-long-random-secret"
JWT_EXPIRES_IN="12h"
CORS_ORIGINS="https://your-client.vercel.app,http://localhost:3000"
```

Contact form email also requires:

```bash
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="website@example.com"
SMTP_PASS="smtp-password-or-app-password"
CONTACT_TO_EMAIL="info@example.com"
CONTACT_FROM_EMAIL="website@example.com"
```

After deployment, verify:

```bash
https://your-server.vercel.app/api/v1/health
```

Use the returned Vercel URL in the client as:

```bash
NEXT_PUBLIC_API_URL="https://your-server.vercel.app/api/v1"
```
