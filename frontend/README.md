# Sensor Orders Kanban Frontend

This is a Next.js + Tailwind CSS frontend for managing sensor orders in a Kanban board. It uses TypeScript and Zustand for state management.

## Getting Started

```bash
npm install
npm run dev
```

Create an `.env.local` file based on `.env.local.example` and set `NEXT_PUBLIC_API_URL` to your backend endpoint.

The project requires **Node.js 18**. You can use the provided `.nvmrc` file or the `engines` field in `package.json` to ensure the correct version.

## Deployment

When deploying to Vercel, set the **Root Directory** of the project to `frontend` in your project settings.

Run the production build with:

```bash
npm run build
npm start
```
The project can be deployed to Railway or Vercel. After building, follow your platform's instructions.
