"use client";

import { useEffect, useRef } from "react";

export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time = 0) => {
      ctx.clearRect(0, 0, width, height);
      const lines = 7;
      for (let line = 0; line < lines; line += 1) {
        ctx.beginPath();
        const base = height * (0.55 + line * 0.065);
        for (let x = -20; x <= width + 20; x += 8) {
          const y = base + Math.sin(x * 0.012 + time * 0.00035 + line * 0.7) * (8 + line * 1.5);
          if (x === -20) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(218, 239, 236, ${0.28 - line * 0.025})`;
        ctx.lineWidth = line === 0 ? 1.4 : 1;
        ctx.stroke();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="hero-canvas" ref={ref} aria-hidden="true" />;
}
