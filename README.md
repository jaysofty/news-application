# SuperBo News Dashboard

SuperBo News Dashboard is a full-stack news article management application built with Next.js, TypeScript, Prisma, PostgreSQL, React Query, Docker, and Nginx.

The application allows users to view, search, create, update, and delete news articles through a simple and professional dashboard.

## Features

- View news articles
- Search articles by title, description, and source
- Create articles
- Edit articles
- PATCH articles
- PUT articles
- Delete articles
- Delete confirmation dialog
- Toast notifications
- Loading and error states
- Empty search state
- React Query for server-state management
- Prisma ORM
- PostgreSQL database
- Dockerized application
- Nginx reverse proxy

## Tech Stack

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **TanStack React Query**
- **React Hot Toast**
- **Prisma 7**
- **PostgreSQL**
- **Docker & Docker Compose**
- **Nginx**

## Project Structure

```text
src/
├── app/
│   ├── api/
│   │   └── articles/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   └── page.tsx
│
├── components/
│   └── news/
│       ├── ArticleCard.tsx
│       ├── ArticleList.tsx
│       ├── ArticleForm.tsx
│       ├── DeleteArticleDialog.tsx
│       └── NewsDashboard.tsx
│
├── hooks/
│   ├── useArticles.ts
│   └── useArticleActions.ts
│
├── lib/
│   ├── articles/
│   │   └── articles.ts
│   └── prisma.ts
│
└── types/
    └── article.ts

prisma/
├── migrations/
├── schema.prisma
└── seed.ts

nginx/
├── Dockerfile
└── nginx.conf

Dockerfile
docker-compose.yml
prisma.config.ts

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
