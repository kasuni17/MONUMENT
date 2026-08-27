import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireRole } from "../middleware/auth";

const router = Router();

router.get("/", requireRole("ADMIN"), async (_req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, name: true, email: true, role: true, avatar: true, createdAt: true,
      _count: { select: { bookmarks: true, comments: true } },
    },
  });
  res.json(users);
});

router.patch("/:id/role", requireRole("ADMIN"), async (req, res) => {
  const parsed = z.object({ role: z.enum(["ADMIN", "EDITOR", "READER"]) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid role" });
  const user = await prisma.user.update({ where: { id: req.params.id }, data: { role: parsed.data.role } });
  res.json({ id: user.id, role: user.role });
});

export default router;
