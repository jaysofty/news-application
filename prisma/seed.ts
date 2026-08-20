
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.article.createMany({
    data: [
      {
        title: "Nigeria's Technology Sector Continues to Grow",
        source: "Tech News",
        description: "Technology continues to transform businesses across Nigeria.",
        publishedAt: new Date("2026-08-19T09:00:00Z"),
      },
      {
        title: "New Tech Startups Receive Funding",
        source: "Business Daily",
        description: "Several African startups have secured new investment.",
        publishedAt: new Date("2026-08-19T08:00:00Z"),
      },
      {
        title: "Super Eagles Prepare for Upcoming Match",
        source: "Sports Daily",
        description: "The team begins preparations for their next international fixture.",
        publishedAt: new Date("2026-08-18T15:00:00Z"),
      },
      {
        title: "The Future of Artificial Intelligence",
        source: "AI Weekly",
        description: "Artificial intelligence continues to evolve rapidly.",
        publishedAt: new Date("2026-08-18T12:00:00Z"),
      },
    ],
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });