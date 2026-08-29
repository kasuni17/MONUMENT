import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import { rateLimit } from "express-rate-limit";

import authRoutes from "./routes/auth";
import articleRoutes from "./routes/articles";
import categoryRoutes from "./routes/categories";
import tagRoutes from "./routes/tags";
import authorRoutes from "./routes/authors";
import collectionRoutes from "./routes/collections";
import bookmarkRoutes from "./routes/bookmarks";
import commentRoutes from "./routes/comments";
import mediaRoutes from "./routes/media";
import userRoutes from "./routes/users";
import newsletterRoutes from "./routes/newsletter";
import searchRoutes from "./routes/search";
import analyticsRoutes from "./routes/analytics";
import settingsRoutes from "./routes/settings";

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "data:", "https:"],
        "frame-src": ["'self'", "https:"],
        "script-src": ["'self'"],
      },
    },
  })
);
// Netlify serves the frontend and this function from the same origin, so
// most requests carry no Origin header (or one matching that same site) —
// still allow-list it explicitly since browsers do send Origin on
// same-origin, non-GET requests. FRONTEND_URL / Netlify's own URL env vars
// cover the deployed domain(s); localhost stays allowed for local dev.
const allowedOrigins = [process.env.FRONTEND_URL, process.env.URL, process.env.DEPLOY_PRIME_URL, process.env.DEPLOY_URL].filter(
  (value): value is string => Boolean(value)
);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || /^http:\/\/localhost:\d+$/.test(origin) || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
const uploadsStaticDir = process.env.NETLIFY ? "/tmp/uploads" : path.join(__dirname, "..", "uploads");
app.use("/uploads", express.static(uploadsStaticDir));

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50, standardHeaders: true, legacyHeaders: false });

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/users", userRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/settings", settingsRoutes);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

export default app;
