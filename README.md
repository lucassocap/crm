# CRM Frontend

This repository contains a simple frontend for managing vehicle sensor orders.

The `/frontend` directory holds a Next.js project configured with Tailwind CSS and Zustand for state management. It implements a Kanban board with drag-and-drop to move orders between statuses.

To get started:

```bash
cd frontend
npm install
npm run dev
```

Create `.env.local` from `.env.local.example` and set `NEXT_PUBLIC_API_URL` to your backend endpoint.
