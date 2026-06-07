'use client';
import { useEffect, useRef, useState } from 'react';

type Metric = { value: string; label: string };

function AnimatedValue({ raw }: { raw: string }) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState('0');
  const animated = useRef(false);

  useEffect(() => {
    const isSpecial = raw.includes(':') || raw === '1:1' || raw.startsWith('60 ');
    if (isSpecial) {
      setDisplay(raw);
      return;
    }

    const match = raw.match(/^([+]?)(\d[\d.]*)(.*)/);
    if (!match) { setDisplay(raw); return; }

    const prefix = match[1];
    const num = parseFloat(match[2].replace('.', ''));
    const suffix = match[3];

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const duration = 1500;
        const start = Date.now();
        const tick = () => {
          const t = Math.min((Date.now() - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const cur = Math.round(eased * num);
          const fmt = cur >= 1000
            ? cur.toLocaleString('pt-BR').replace(',', '.')
            : String(cur);
          setDisplay(`${prefix}${fmt}${suffix}`);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [raw]);

  return <strong ref={ref}>{display}</strong>;
}

export default function MetricsStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <section className="proof-strip" data-reveal>
      {metrics.map((metric) => (
        <article className="metric-card" key={metric.label}>
          <AnimatedValue raw={metric.value} />
          <span>{metric.label}</span>
        </article>
      ))}
    </section>
  );
}
