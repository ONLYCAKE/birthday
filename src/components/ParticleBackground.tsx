import { useEffect, useRef } from "react";
import { FloatingHearts } from "./FloatingHearts";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function ParticleBackground() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="atmosphere" aria-hidden="true">
      <span className="blob blob-a" />
      <span className="blob blob-b" />
      <span className="blob blob-c" />
      {!reduced && (
        <>
          <span className="stars" />
          <FloatingHearts />
        </>
      )}
    </div>
  );
}

export function CursorSparkle() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: PointerEvent) => {
      node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      node.style.opacity = "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={ref} className="cursor-sparkle" aria-hidden="true" />;
}
