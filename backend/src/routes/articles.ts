import { Router } from "express";
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";
import slugify from "slugify";
import { prisma } from "../lib/prisma";
import { optionalAuth, requireRole } from "../middleware/auth";
import { readingTimeFromHtml, paginate } from "../lib/utils";

const router = Router();

const cardSelect = {
  id: true,
  title: true,
  slug: true,
  subtitle: true,
  excerpt: true,
  coverImage: true,
  coverImageAlt: true,
  status: true,
  publishedAt: true,
  readingTimeMin: true,
  views: true,
  featured: true,
  createdAt: true,
  category: { select: { id: true, name: true, slug: true } },
  author: { select: { id: true, name: true, slug: true, avatar: true } },
  tags: { select: { id: true, name: true, slug: true } },
};

function isStaff(role?: string) {
  return role === "ADMIN" || role === "EDITOR";
}

router.get("/", optionalAuth, async (req, res) => {
  const {
    page,
    pageSize,
    category,
    tag,
    author,
    collection,
    status,
    q,
    sort,
    featured,
  } = req.query as Record<string, string>;

  const { take, skip, currentPage } = paginate(page, pageSize);
  const staff = isStaff(req.user?.role);

  const where: any = {};
  if (staff && status) {
    where.status = status;
  } else if (!staff) {
    where.status = "PUBLISHED";
  }
  if (category) where.category = { slug: category };
  if (tag) where.tags = { some: { slug: tag } };
  if (author) where.author = { slug: author };
  if (collection) where.collections = { some: { slug: collection } };
  if (featured === "true") where.featured = true;
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { excerpt: { contains: q } },
      { subtitle: { contains: q } },
      { content: { contains: q } },
    ];
  }

  const orderBy =
    sort === "popular"
      ? [{ views: "desc" as const }]
      : sort === "oldest"
      ? [{ publishedAt: "asc" as const }]
      : [{ publishedAt: "desc" as const }, { createdAt: "desc" as const }];

  const [items, total] = await Promise.all([
    prisma.article.findMany({ where, select: cardSelect, orderBy, take, skip }),
    prisma.article.count({ where }),
  ]);

  res.json({ items, total, page: currentPage, pageSize: take, totalPages: Math.max(1, Math.ceil(total / take)) });
});

router.get("/:slug", optionalAuth, async (req, res) => {
  const article = await prisma.article.findUnique({
    where: { slug: req.params.slug },
    include: {
      category: true,
      author: true,
      tags: true,
      collections: { select: { id: true, title: true, slug: true } },
      comments: {
        where: { status: "APPROVED" },
        include: { user: { select: { id: true, name: true, avatar: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!article) return res.status(404).json({ error: "Article not found" });

  const staff = isStaff(req.user?.role);
  if (article.status !== "PUBLISHED" && !staff) {
    return res.status(404).json({ error: "Article not found" });
  }

  let bookmarked = false;
  if (req.user) {
    const bm = await prisma.bookmark.findUnique({
      where: { userId_articleId: { userId: req.user.id, articleId: article.id } },
    });
    bookmarked = !!bm;
  }

  res.json({ ...article, bookmarked });
});

router.post("/:id/view", async (req, res) => {
  const article = await prisma.article.findUnique({ where: { id: req.params.id } });
  if (!article) return res.status(404).json({ error: "Not found" });
  await prisma.$transaction([
    prisma.article.update({ where: { id: article.id }, data: { views: { increment: 1 } } }),
    prisma.articleView.create({ data: { articleId: article.id } }),
  ]);
  res.status(204).end();
});

const articleSchema = z.object({
  title: z.string().min(3).max(200),
  subtitle: z.string().max(300).optional().nullable(),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(1),
  coverImage: z.string().url(),
  coverImageAlt: z.string().optional().nullable(),
  categoryId: z.string(),
  authorId: z.string(),
  tagIds: z.array(z.string()).default([]),
  collectionIds: z.array(z.string()).default([]),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]).default("DRAFT"),
  publishedAt: z.string().datetime().optional().nullable(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  slug: z.string().optional(),
});

async function uniqueSlug(base: string, excludeId?: string) {
  let slug = slugify(base, { lower: true, strict: true }).slice(0, 90);
  let n = 1;
  while (true) {
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    n += 1;
    slug = `${slugify(base, { lower: true, strict: true }).slice(0, 85)}-${n}`;
  }
}

router.post("/", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const parsed = articleSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });
  const data = parsed.data;

  const cleanContent = DOMPurify.sanitize(data.content, {
    ALLOWED_TAGS: [
      "p","h2","h3","h4","strong","em","a","ul","ol","li","blockquote","img","figure",
      "figcaption","pre","code","hr","br","div","span","table","thead","tbody","tr","td","th","iframe",
    ],
    ALLOWED_ATTR: ["href","src","alt","title","class","target","rel","data-type","data-url","colspan","rowspan","allow","allowfullscreen","frameborder"],
  });

  const slug = data.slug ? await uniqueSlug(data.slug) : await uniqueSlug(data.title);

  const article = await prisma.article.create({
    data: {
      title: data.title,
      subtitle: data.subtitle || null,
      excerpt: data.excerpt,
      content: cleanContent,
      coverImage: data.coverImage,
      coverImageAlt: data.coverImageAlt || null,
      slug,
      categoryId: data.categoryId,
      authorId: data.authorId,
      status: data.status,
      publishedAt: data.status === "PUBLISHED" ? new Date() : data.publishedAt ? new Date(data.publishedAt) : null,
      readingTimeMin: readingTimeFromHtml(cleanContent),
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
      featured: data.featured || false,
      tags: { connect: data.tagIds.map((id) => ({ id })) },
      collections: { connect: data.collectionIds.map((id) => ({ id })) },
    },
    include: { category: true, author: true, tags: true },
  });

  res.status(201).json(article);
});

router.put("/:id", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const parsed = articleSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });
  const data = parsed.data;

  const existing = await prisma.article.findUnique({ where: { id: req.params.id } });
  if (!existing) return res.status(404).json({ error: "Not found" });

  const updateData: any = {};
  if (data.title) updateData.title = data.title;
  if (data.subtitle !== undefined) updateData.subtitle = data.subtitle;
  if (data.excerpt) updateData.excerpt = data.excerpt;
  if (data.coverImage) updateData.coverImage = data.coverImage;
  if (data.coverImageAlt !== undefined) updateData.coverImageAlt = data.coverImageAlt;
  if (data.categoryId) updateData.categoryId = data.categoryId;
  if (data.authorId) updateData.authorId = data.authorId;
  if (data.seoTitle !== undefined) updateData.seoTitle = data.seoTitle;
  if (data.seoDescription !== undefined) updateData.seoDescription = data.seoDescription;
  if (data.featured !== undefined) updateData.featured = data.featured;

  if (data.content) {
    const cleanContent = DOMPurify.sanitize(data.content, {
      ALLOWED_TAGS: [
        "p","h2","h3","h4","strong","em","a","ul","ol","li","blockquote","img","figure",
        "figcaption","pre","code","hr","br","div","span","table","thead","tbody","tr","td","th","iframe",
      ],
      ALLOWED_ATTR: ["href","src","alt","title","class","target","rel","data-type","data-url","colspan","rowspan","allow","allowfullscreen","frameborder"],
    });
    updateData.content = cleanContent;
    updateData.readingTimeMin = readingTimeFromHtml(cleanContent);
  }

  if (data.slug && data.slug !== existing.slug) {
    updateData.slug = await uniqueSlug(data.slug, existing.id);
  }

  if (data.status) {
    updateData.status = data.status;
    if (data.status === "PUBLISHED" && !existing.publishedAt) updateData.publishedAt = new Date();
    if (data.status === "SCHEDULED" && data.publishedAt) updateData.publishedAt = new Date(data.publishedAt);
  }

  if (data.tagIds) updateData.tags = { set: data.tagIds.map((id) => ({ id })) };
  if (data.collectionIds) updateData.collections = { set: data.collectionIds.map((id) => ({ id })) };

  const article = await prisma.article.update({
    where: { id: existing.id },
    data: updateData,
    include: { category: true, author: true, tags: true, collections: true },
  });

  res.json(article);
});

router.patch("/:id/status", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const schema = z.object({ status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]), publishedAt: z.string().datetime().optional() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid status" });

  const existing = await prisma.article.findUnique({ where: { id: req.params.id } });
  if (!existing) return res.status(404).json({ error: "Not found" });

  const data: any = { status: parsed.data.status };
  if (parsed.data.status === "PUBLISHED") data.publishedAt = existing.publishedAt || new Date();
  if (parsed.data.status === "SCHEDULED" && parsed.data.publishedAt) data.publishedAt = new Date(parsed.data.publishedAt);

  const article = await prisma.article.update({ where: { id: existing.id }, data });
  res.json(article);
});

router.delete("/:id", requireRole("ADMIN", "EDITOR"), async (req, res) => {
  const existing = await prisma.article.findUnique({ where: { id: req.params.id } });
  if (!existing) return res.status(404).json({ error: "Not found" });
  await prisma.article.delete({ where: { id: existing.id } });
  res.status(204).end();
});

export default router;
