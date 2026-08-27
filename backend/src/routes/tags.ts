import { Router } from "express";
import { z } from "zod";
import slugify from "slugify";
import { prisma } from "../lib/prisma";
import { requireRole } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  const tags = await prisma.tag.findMany({
    include: { _count: { select: { articles: true } } },
    orderBy: { name: "asc" },
  });
  res.json(tags);
});

const schema = z.object({ name: z.string().min(2).max(40) });

router.post("/", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });
  const slug = slugify(parsed.data.name, { lower: true, strict: true });
  const tag = await prisma.tag.create({ data: { name: parsed.data.name, slug } });
  res.status(201).json(tag);
});

router.put("/:id", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });
  const slug = slugify(parsed.data.name, { lower: true, strict: true });
  const tag = await prisma.tag.update({ where: { id: req.params.id }, data: { name: parsed.data.name, slug } });
  res.json(tag);
});

router.delete("/:id", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  await prisma.tag.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

export default router;
