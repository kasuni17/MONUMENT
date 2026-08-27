import { Router } from "express";
import { z } from "zod";
import slugify from "slugify";
import { prisma } from "../lib/prisma";
import { requireRole } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  const authors = await prisma.author.findMany({
    include: { _count: { select: { articles: true } } },
    orderBy: { name: "asc" },
  });
  res.json(authors);
});

router.get("/:slug", async (req, res) => {
  const author = await prisma.author.findUnique({
    where: { slug: req.params.slug },
    include: {
      articles: {
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        select: {
          id: true, title: true, slug: true, excerpt: true, coverImage: true,
          publishedAt: true, readingTimeMin: true, views: true,
          category: { select: { name: true, slug: true } },
        },
      },
      _count: { select: { articles: true } },
    },
  });
  if (!author) return res.status(404).json({ error: "Not found" });
  res.json(author);
});

const schema = z.object({
  name: z.string().min(2).max(80),
  bio: z.string().max(500).optional().nullable(),
  avatar: z.string().url().optional().nullable(),
  socialLinks: z.string().optional().nullable(),
});

router.post("/", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });
  const slug = slugify(parsed.data.name, { lower: true, strict: true });
  const author = await prisma.author.create({ data: { ...parsed.data, slug } });
  res.status(201).json(author);
});

router.put("/:id", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const parsed = schema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });
  const data: any = { ...parsed.data };
  if (data.name) data.slug = slugify(data.name, { lower: true, strict: true });
  const author = await prisma.author.update({ where: { id: req.params.id }, data });
  res.json(author);
});

router.delete("/:id", requireRole("ADMIN"), async (req, res) => {
  await prisma.author.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

export default router;
