import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type Item = { src: string; alt: string };

export async function GET() {
  const dir = path.join(process.cwd(), "public", "gallery");
  try {
    const files = await fs.readdir(dir);
    const images = files
      .filter((f) => /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(f))
      .map<Item>((f) => {
        const base = f.replace(/\.[^/.]+$/, "");
        const alt = base.replace(/[-_]+/g, " ").trim();
        return { src: `/gallery/${f}`, alt: alt || "Avatar" };
      });
    return NextResponse.json(
      { items: images },
      {
        headers: {
          "Cache-Control": "public, max-age=300",
        },
      }
    );
  } catch {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}

