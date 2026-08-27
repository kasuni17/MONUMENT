import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireRole } from "../middleware/auth";

const router = Router();

router.get("/summary", requireRole("ADMIN", "EDITOR"), async (_req, res) => {
  const [totalArticles, published, drafts, scheduled, totalUsers, totalBookmarks, totalComments, viewsAgg] =
    await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { status: "PUBLISHED" } }),
      prisma.article.count({ where: { status: "DRAFT" } }),
      prisma.article.count({ where: { status: "SCHEDULED" } }),
      prisma.user.count(),
      prisma.bookmark.count(),
      prisma.comment.count(),
      prisma.article.aggregate({ _sum: { views: true } }),
    ]);

  res.json({
    totalArticles,
    published,
    drafts,
    scheduled,
    totalUsers,
    totalBookmarks,
    totalComments,
    totalViews: viewsAgg._sum.views || 0,
  });
});

router.get("/views-over-time", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const days = Math.min(parseInt((req.query.days as string) || "30", 10), 180);
  const since = new Date();
  since.setDate(since.getDate() - days);

  const views = await prisma.articleView.findMany({
    where: { createdAt: { gte: since } },
    select: { createdAt: true },
  });

  const buckets: Record<string, number> = {};
  for (let i = 0; i < days; i++) {
    const d = new Date(since);
    d.setDate(d.getDate() + i);
    buckets[d.toISOString().slice(0, 10)] = 0;
  }
  views.forEach((v) => {
    const key = v.createdAt.toISOString().slice(0, 10);
    if (key in buckets) buckets[key] += 1;
  });

  res.json(Object.entries(buckets).map(([date, views]) => ({ date, views })));
});

router.get("/top-articles", requireRole("ADMIN", "EDITOR"), async (_req, res) => {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { views: "desc" },
    take: 8,
    select: { id: true, title: true, slug: true, views: true, category: { select: { name: true } } },
  });
  res.json(articles);
});

router.get("/top-categories", requireRole("ADMIN", "EDITOR"), async (_req, res) => {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      articles: { where: { status: "PUBLISHED" }, select: { views: true } },
    },
  });
  const data = categories
    .map((c) => ({ name: c.name, views: c.articles.reduce((sum, a) => sum + a.views, 0), count: c.articles.length }))
    .sort((a, b) => b.views - a.views);
  res.json(data);
});

export default router;
