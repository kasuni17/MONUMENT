import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireRole } from "../middleware/auth";

const router = Router();

router.post("/", async (req, res) => {
  const parsed = z.object({ email: z.string().email() }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Enter a valid email" });

  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email: parsed.data.email } });
  if (existing) return res.status(200).json({ message: "You're already subscribed." });

  const sub = await prisma.newsletterSubscriber.create({ data: { email: parsed.data.email } });
  res.status(201).json(sub);
});

router.get("/", requireRole("ADMIN"), async (_req, res) => {
  const subs = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });
  res.json(subs);
});

export default router;
