'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const animate = () => {
      outerX += (mouseX - outerX) * 0.13;
      outerY += (mouseY - outerY) * 0.13;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerX - 22}px, ${outerY - 22}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    const controller = new AbortController();
    const { signal } = controller;

    const refreshInteractives = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => outerRef.current?.classList.add('cursor-hover'), { signal });
        el.addEventListener('mouseleave', () => outerRef.current?.classList.remove('cursor-hover'), { signal });
      });
    };

    refreshInteractives();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      controller.abort();
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="custom-cursor" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
