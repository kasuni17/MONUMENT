// This file only ever runs as the Netlify Function entrypoint, so it's safe
// to force NETLIFY=true unconditionally. app.ts/media.ts read this at module
// init time to pick /tmp/uploads over the read-only bundle directory.
//
// This must run before the Express app is loaded. A top-level `import`
// won't do that: esbuild bundles ES `import`s in dependency-first order, so
// the imported module's top-level code runs before this file's own
// statements even when the `import` line appears after them in source. A
// plain `require()` call executes exactly where it's written, so it's used
// here instead to guarantee ordering.
process.env.NETLIFY = "true";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serverless = require("serverless-http");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const app = require("../../backend/src/app").default;

// Wraps the existing Express app (unchanged routes/behavior) so it can run
// as a single Netlify Function. netlify.toml redirects /api/* and
// /uploads/* here; the Express app still sees the original request paths.
export const handler = serverless(app);
