import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: "desc" },
    include: {
      article: {
        select: {
          id: true, title: true, slug: true, excerpt: true, coverImage: true,
          readingTimeMin: true, publishedAt: true, views: true,
          category: { select: { name: true, slug: true } },
          author: { select: { name: true, slug: true, avatar: true } },
        },
      },
    },
  });
  res.json(bookmarks);
});

router.post("/", requireAuth, async (req, res) => {
  const schema = z.object({ articleId: z.string() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "articleId required" });

  const existing = await prisma.bookmark.findUnique({
    where: { userId_articleId: { userId: req.user!.id, articleId: parsed.data.articleId } },
  });
  if (existing) return res.status(200).json(existing);

  const bookmark = await prisma.bookmark.create({
    data: { userId: req.user!.id, articleId: parsed.data.articleId },
  });
  res.status(201).json(bookmark);
});

router.delete("/:articleId", requireAuth, async (req, res) => {
  await prisma.bookmark.deleteMany({
    where: { userId: req.user!.id, articleId: req.params.articleId },
  });
  res.status(204).end();
});

export default router;
