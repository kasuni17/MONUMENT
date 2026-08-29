import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (req, res) => {
  const { q, category, author, sort } = req.query as Record<string, string>;
  if (!q || q.trim().length < 2) return res.json({ items: [], total: 0 });

  const where: any = {
    status: "PUBLISHED",
    OR: [
      { title: { contains: q, mode: "insensitive" } },
      { excerpt: { contains: q, mode: "insensitive" } },
      { content: { contains: q, mode: "insensitive" } },
      { tags: { some: { name: { contains: q, mode: "insensitive" } } } },
      { author: { name: { contains: q, mode: "insensitive" } } },
      { category: { name: { contains: q, mode: "insensitive" } } },
    ],
  };
  if (category) where.category = { slug: category };
  if (author) where.author = { slug: author };

  const orderBy = sort === "popular" ? { views: "desc" as const } : { publishedAt: "desc" as const };

  const items = await prisma.article.findMany({
    where,
    orderBy,
    take: 30,
    select: {
      id: true, title: true, slug: true, excerpt: true, coverImage: true,
      publishedAt: true, readingTimeMin: true, views: true,
      category: { select: { name: true, slug: true } },
      author: { select: { name: true, slug: true, avatar: true } },
    },
  });

  res.json({ items, total: items.length });
});

export default router;
