import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { imageSize } from "image-size";
import { prisma } from "../lib/prisma";
import { requireRole } from "../middleware/auth";

const router = Router();

// On Netlify Functions the deployment bundle (/var/task) is read-only, so
// uploads must be written to /tmp instead. NODE_ENV isn't reliably set to
// "production" in the Functions runtime, so detect Netlify explicitly via
// its own NETLIFY env var. Files written to /tmp do not persist across cold
// starts or separate function instances — see deployment notes.
const isNetlify = process.env.NETLIFY === "true" || process.env.NETLIFY === "1";

const uploadsDir = isNetlify ? "/tmp/uploads" : path.join(__dirname, "..", "..", "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!/^image\/(png|jpe?g|webp|gif|svg\+xml)$/.test(file.mimetype)) {
      return cb(new Error("Only image uploads are allowed"));
    }
    cb(null, true);
  },
});

router.get("/", requireRole("ADMIN", "EDITOR"), async (_req, res) => {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    include: { uploadedBy: { select: { name: true } } },
  });
  res.json(media);
});

router.post("/", requireRole("ADMIN", "EDITOR"), upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  let width: number | undefined;
  let height: number | undefined;
  try {
    const dimensions = imageSize(fs.readFileSync(req.file.path));
    width = dimensions.width;
    height = dimensions.height;
  } catch {
    // svg or unreadable dims, skip
  }

  const media = await prisma.media.create({
    data: {
      filename: req.file.originalname,
      url: `/uploads/${req.file.filename}`,
      mimeType: req.file.mimetype,
      size: req.file.size,
      width,
      height,
      uploadedById: req.user!.id,
    },
  });
  res.status(201).json(media);
});

router.delete("/:id", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const media = await prisma.media.findUnique({ where: { id: req.params.id } });
  if (!media) return res.status(404).json({ error: "Not found" });
  const filePath = path.join(uploadsDir, path.basename(media.url));
  fs.unlink(filePath, () => {});
  await prisma.media.delete({ where: { id: media.id } });
  res.status(204).end();
});

export default router;
