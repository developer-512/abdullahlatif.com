"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouchDevice) return;

    function onMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY };
    }

    function animate() {
      const ease = 0.12;
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 200}px, ${pos.current.y - 200}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x - 16}px, ${pos.current.y - 16}px)`;
      }

      raf.current = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[1] opacity-30 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[2] border border-emerald-500/20 opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
        }}
        aria-hidden
      />
    </>
  );
}
