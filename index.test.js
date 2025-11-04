import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";

import app, { _setCount, _getCount } from "./index";

describe("Counter API", () => {
  beforeEach(() => {
    _setCount(0);
  });

  it("GET /api/counter returns default 0", async () => {
    const res = await request(app).get("/api/counter");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ count: 0 });
  });

  it("POST /api/increment increases the counter by 1", async () => {
    const res1 = await request(app).post("/api/increment");
    expect(res1.status).toBe(200);
    expect(res1.body.count).toBe(1);

    const res2 = await request(app).get("/api/counter");
    expect(res2.body.count).toBe(1);
  });

  it("POST /api/increment?by=5 increases the counter by 5", async () => {
    const res = await request(app).post("/api/increment?by=5");
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(5);
  });

  it("POST /api/reset resets counter to 0", async () => {
    _setCount(3);
    const res = await request(app).post("/api/reset");
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(0);
    expect(_getCount()).toBe(0);
  });

  it("GET /health returns ok true", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});