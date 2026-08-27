import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth, requireRole } from "../middleware/auth";

const router = Router();

router.get("/admin", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const { status } = req.query as Record<string, string>;
  const comments = await prisma.comment.findMany({
    where: status ? { status: status as any } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, avatar: true } },
      article: { select: { id: true, title: true, slug: true } },
    },
  });
  res.json(comments);
});

router.get("/article/:articleId", async (req, res) => {
  const comments = await prisma.comment.findMany({
    where: { articleId: req.params.articleId, status: "APPROVED" },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { id: true, name: true, avatar: true } } },
  });
  res.json(comments);
});

router.post("/", requireAuth, async (req, res) => {
  const bodySchema = z.object({ articleId: z.string(), body: z.string().min(2).max(2000) });
  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });

  const comment = await prisma.comment.create({
    data: { articleId: parsed.data.articleId, body: parsed.data.body, userId: req.user!.id, status: "PENDING" },
    include: { user: { select: { id: true, name: true, avatar: true } } },
  });
  res.status(201).json(comment);
});

router.patch("/:id/status", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const parsed = z.object({ status: z.enum(["PENDING", "APPROVED", "REJECTED"]) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid status" });
  const comment = await prisma.comment.update({ where: { id: req.params.id }, data: { status: parsed.data.status } });
  res.json(comment);
});

router.delete("/:id", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  await prisma.comment.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

export default router;
