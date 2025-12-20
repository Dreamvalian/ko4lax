"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type CounterResponse = { count: number };

function fmt(n: number, compact?: boolean) {
  if (compact && n >= 1000) {
    const v = n / 1000;
    return `${v.toFixed(v < 10 ? 1 : 0)}K`;
  }
  return n.toLocaleString();
}

export function ViewCounter({
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
}) {
  const [views, setViews] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const track = async () => {
      try {
        const res = await fetch(
          `/api/views?path=${encodeURIComponent(pathname)}`,
          {
            method: "POST",
          }
        );
        if (!res.ok) return;
        const data = (await res.json()) as CounterResponse;
        setViews(data.count);
      } catch {
        setViews(null);
      }
    };
    track();
  }, [pathname]);

  if (views === null) return null;

  return (
    <span
      className={className ?? "text-[11px] sm:text-xs text-subtle"}
      aria-live='polite'>
      {fmt(views, compact)} views
    </span>
  );
}
