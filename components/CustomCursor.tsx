"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [interactive, setInteractive] = useState(false);
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const isInteractive = (el: Element | null) => {
      if (!el) return false;
      const selectors =
        'a,button,[role="button"],[role="link"],input[type="button"],input[type="submit"],input[type="checkbox"],input[type="radio"],label,.clickable,.interactive';
      return Boolean(el.matches(selectors) || el.closest(selectors));
    };

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setInteractive(isInteractive(e.target as Element));
    };

    const tick = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.15;
      ring.current.y += (target.current.y - ring.current.y) * 0.15;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafId.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 100,
      }}>
      <div
        ref={ringRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: interactive ? 36 : 22,
          height: interactive ? 36 : 22,
          marginLeft: -((interactive ? 36 : 22) / 2),
          marginTop: -((interactive ? 36 : 22) / 2),
          borderRadius: "9999px",
          border: "2px solid rgba(99,102,241,0.6)",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "saturate(1.1) contrast(1.05)",
          transition: "width 120ms ease, height 120ms ease, border 120ms ease",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: interactive ? 20 : 16,
          height: interactive ? 20 : 16,
          marginLeft: -((interactive ? 20 : 16) / 2),
          marginTop: -((interactive ? 20 : 16) / 2),
          borderRadius: "9999px",
          overflow: "hidden",
          willChange: "transform",
          transition: "width 120ms ease, height 120ms ease",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          backgroundColor: "transparent",
        }}>
        <Image
          src={"/games/minecraft.png"}
          alt=''
          width={24}
          height={24}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          priority
        />
      </div>
    </div>
  );
}
