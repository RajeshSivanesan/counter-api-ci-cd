import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// In-memory state (resets on server restart or new deploy)
let count = 0;

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
  count += 1;
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