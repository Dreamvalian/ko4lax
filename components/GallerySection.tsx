"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Item = { src: string; alt: string };
type Response = { items: Item[] };

export function GallerySection() {
  const [items, setItems] = useState<Item[]>([]);
  const [limit, setLimit] = useState(20);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/gallery", { method: "GET" });
        if (!res.ok) return;
        const data = (await res.json()) as Response;
        if (active) setItems(data.items ?? []);
      } catch {
        // ignore
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const paginated = useMemo(() => items.slice(0, limit), [items, limit]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    if (items.length <= 20) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setLimit((l) => Math.min(l + 20, items.length));
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [items.length]);

  if (!items.length) return null;

  return (
    <section
      aria-labelledby='gallery-heading'
      className='space-y-3 sm:space-y-4 text-sm sm:text-base'>
      <h2
        id='gallery-heading'
        className='text-xs uppercase tracking-[0.2em] text-subtle'>
        Gallery
      </h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4'>
        {paginated.map((item) => (
          <article
            key={item.src}
            className='group relative rounded-soft border border-gray-200/80 bg-surface/90 shadow-[0_18px_70px_rgba(15,23,42,0.08)] overflow-hidden'>
            <div className='aspect-square relative'>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                loading='lazy'
                sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px'
                className='object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]'
              />
              <span className='sr-only'>{item.alt}</span>
            </div>
            <div className='absolute inset-0 ring-0 group-hover:ring-2 ring-accent/40 transition' />
          </article>
        ))}
      </div>
      {items.length > limit && (
        <div ref={sentinelRef} className='h-6' aria-hidden='true' />
      )}
    </section>
  );
}
