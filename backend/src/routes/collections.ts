import { Router } from "express";
import { z } from "zod";
import slugify from "slugify";
import { prisma } from "../lib/prisma";
import { requireRole } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  const collections = await prisma.collection.findMany({
    include: {
      _count: { select: { articles: true } },
      articles: {
        where: { status: "PUBLISHED" },
        take: 4,
        orderBy: { publishedAt: "desc" },
        select: { id: true, title: true, slug: true, coverImage: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  res.json(collections);
});

router.get("/:slug", async (req, res) => {
  const collection = await prisma.collection.findUnique({
    where: { slug: req.params.slug },
    include: {
      articles: {
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        include: {
          category: { select: { name: true, slug: true } },
          author: { select: { name: true, slug: true, avatar: true } },
        },
      },
    },
  });
  if (!collection) return res.status(404).json({ error: "Not found" });
  res.json(collection);
});

const schema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().max(400).optional().nullable(),
  coverImage: z.string().url().optional().nullable(),
  articleIds: z.array(z.string()).optional(),
});

router.post("/", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });
  const slug = slugify(parsed.data.title, { lower: true, strict: true });
  const { articleIds, ...rest } = parsed.data;
  const collection = await prisma.collection.create({
    data: { ...rest, slug, articles: articleIds ? { connect: articleIds.map((id) => ({ id })) } : undefined },
  });
  res.status(201).json(collection);
});

router.put("/:id", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const parsed = schema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });
  const { articleIds, ...rest } = parsed.data;
  const data: any = { ...rest };
  if (data.title) data.slug = slugify(data.title, { lower: true, strict: true });
  if (articleIds) data.articles = { set: articleIds.map((id) => ({ id })) };
  const collection = await prisma.collection.update({ where: { id: req.params.id }, data });
  res.json(collection);
});

router.delete("/:id", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  await prisma.collection.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

export default router;
