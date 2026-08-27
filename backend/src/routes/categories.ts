import { Router } from "express";
import { z } from "zod";
import slugify from "slugify";
import { prisma } from "../lib/prisma";
import { requireRole } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { articles: true } } },
    orderBy: { name: "asc" },
  });
  res.json(categories);
});

router.get("/:slug", async (req, res) => {
  const category = await prisma.category.findUnique({
    where: { slug: req.params.slug },
    include: { _count: { select: { articles: true } } },
  });
  if (!category) return res.status(404).json({ error: "Not found" });
  res.json(category);
});

const schema = z.object({
  name: z.string().min(2).max(60),
  description: z.string().max(300).optional().nullable(),
  coverImage: z.string().url().optional().nullable(),
});

router.post("/", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });
  const slug = slugify(parsed.data.name, { lower: true, strict: true });
  const category = await prisma.category.create({ data: { ...parsed.data, slug } });
  res.status(201).json(category);
});

router.put("/:id", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const parsed = schema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });
  const data: any = { ...parsed.data };
  if (data.name) data.slug = slugify(data.name, { lower: true, strict: true });
  const category = await prisma.category.update({ where: { id: req.params.id }, data });
  res.json(category);
});

router.delete("/:id", requireRole("ADMIN"), async (req, res) => {
  await prisma.category.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

export default router;
