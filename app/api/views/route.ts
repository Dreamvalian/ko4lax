import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";

type Store = { [key: string]: { count: number; updatedAt: number } };

const dataPath = path.join(process.cwd(), "data", "views.json");
let cache: Store | null = null;
const rate: Map<string, { ts: number[] }> = new Map();

async function ensureFile() {
  try {
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    await fs.access(dataPath);
  } catch {
    await fs.writeFile(dataPath, JSON.stringify({}, null, 2), "utf8");
  }
}

async function loadStore(): Promise<Store> {
  if (cache) return cache;
  await ensureFile();
  const raw = await fs.readFile(dataPath, "utf8");
  cache = raw ? (JSON.parse(raw) as Store) : {};
  return cache!;
}

async function persistStore() {
  if (!cache) return;
  await fs.writeFile(dataPath, JSON.stringify(cache, null, 2), "utf8");
}

function formatKey(p: string) {
  return p || "/";
}

function isBot(ua: string | null) {
  if (!ua) return false;
  const re =
    /(bot|crawl|spider|preview|linkchecker|facebookexternalhit|whatsapp|telegram|discord|twitterbot)/i;
  return re.test(ua);
}

function getIp(req: NextRequest) {
  const hdr = req.headers.get("x-forwarded-for");
  if (hdr) return hdr.split(",")[0].trim();
  const ip = req.headers.get("x-real-ip");
  return ip ?? "0.0.0.0";
}

function limit(ip: string) {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 20;
  const entry = rate.get(ip) ?? { ts: [] };
  entry.ts = entry.ts.filter((t) => now - t < windowMs);
  if (entry.ts.length >= max) {
    rate.set(ip, entry);
    return false;
  }
  entry.ts.push(now);
  rate.set(ip, entry);
  return true;
}

function hashPath(p: string) {
  return createHash("sha1").update(p).digest("hex");
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const p = formatKey(url.searchParams.get("path") ?? "/");
  const store = await loadStore();
  const entry = store[p] ?? { count: 0, updatedAt: Date.now() };
  return NextResponse.json({ count: entry.count });
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const p = formatKey(url.searchParams.get("path") ?? "/");
  const ua = req.headers.get("user-agent");
  if (isBot(ua)) {
    const store = await loadStore();
    const entry = store[p] ?? { count: 0, updatedAt: Date.now() };
    return NextResponse.json({ count: entry.count, skipped: true });
  }

  const ip = getIp(req);
  if (!limit(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const key = `pv_${hashPath(p)}`;
  const hasCookie = req.cookies.get(key)?.value ?? cookies().get(key)?.value;
  const store = await loadStore();
  const entry = store[p] ?? { count: 0, updatedAt: Date.now() };

  if (!hasCookie) {
    entry.count += 1;
    entry.updatedAt = Date.now();
    store[p] = entry;
    await persistStore();
  }

  const res = NextResponse.json({ count: entry.count, updated: !hasCookie });
  res.cookies.set(key, "1", {
    path: "/",
    sameSite: "lax",
  });
  return res;
}

