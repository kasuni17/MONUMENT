import serverless from "serverless-http";
import app from "../../backend/src/app";

// Wraps the existing Express app (unchanged routes/behavior) so it can run
// as a single Netlify Function. netlify.toml redirects /api/* and
// /uploads/* here; the Express app still sees the original request paths.
export const handler = serverless(app);
