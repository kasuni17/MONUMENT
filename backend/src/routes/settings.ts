import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireRole } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  const settings = await prisma.setting.findMany();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  res.json(map);
});

router.put("/", requireRole("ADMIN"), async (req, res) => {
  const entries = Object.entries(req.body || {}) as [string, string][];
  await prisma.$transaction(
    entries.map(([key, value]) =>
      prisma.setting.upsert({ where: { key }, update: { value: String(value) }, create: { key, value: String(value) } })
    )
  );
  const settings = await prisma.setting.findMany();
  res.json(Object.fromEntries(settings.map((s) => [s.key, s.value])));
});

export default router;
