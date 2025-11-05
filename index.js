import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// In-memory state (resets on server restart or new deploy)
let count = 0;

// Expose helpers for tests
export function _setCount(v) { count = v; }
export function _getCount() { return count; }

// GET, POST, PUT, HEAD, DELETE
// REST Pattern

// http status codes
// 200 - 300 => success code
// 301 - redirection
// 400 - client errors
// 500 - server errors

// { count: count } => { count }

// /api/:test => req.params.test
// /api?test=1 => req.query.test
// /api => req.body.test

// Health check (useful for Render)
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, uptime: process.uptime() });
});

// Get current counter
app.get("/api/counter", (_req, res) => {
  res.json({ count });
});

// Increment counter
app.post("/api/increment", (_req, res) => {
  const by = Number(_req.query.by ?? 1);
  const step = Number.isFinite(by) && by > 0 ? Math.floor(by) : 1;
  count += step;
  res.json({ count });
});

app.post("/api/decrement", (_req, res) => {
  const by = Number(_req.query.by ?? 1);
  const step = Number.isFinite(by) && by > 0 ? Math.floor(by) : 1;
  count -= step;
  res.json({ count });
});

// Optional: reset endpoint (handy for demos)
app.post("/api/reset", (_req, res) => {
  count = 0;
  res.json({ count });
});

app.listen(PORT, () => {
  console.log(`🚀 Counter API listening on http://localhost:${PORT}`);
});

export default app;