'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { PLATFORM_STATS } from '@/constants';

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [displayed, setDisplayed] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^([\d,]+)(\+?)(.*)$/);
    if (!match) { setDisplayed(value); return; }
    const raw = match[1].replace(/,/g, '');
    const target = parseInt(raw, 10);
    const suffix = match[2] + match[3];
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const current = Math.round(eased * target);
      setDisplayed(current >= 1000 ? (current / 1000).toFixed(1).replace('.0', '') + 'k' + suffix.replace('+', '') + (target >= 1000 && match[2] ? '+' : '') : current + suffix);
      if (elapsed < 1) requestAnimationFrame(tick);
      else setDisplayed(value);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{inView ? displayed : '0'}</span>;
}

const accentColors = [
  { line: 'from-red-500 to-red-700', dot: 'bg-red-500' },
  { line: 'from-blue-500 to-blue-700', dot: 'bg-blue-500' },
  { line: 'from-emerald-500 to-emerald-700', dot: 'bg-emerald-500' },
  { line: 'from-amber-500 to-amber-700', dot: 'bg-amber-500' },
];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden py-0" style={{ backgroundColor: '#060A14' }}>
      {/* Grid texture */}
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(220,38,38,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Top edge fade */}
      <div
        className="absolute top-0 inset-x-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #060A14, transparent)' }}
      />
      {/* Bottom edge fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #060A14, transparent)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="h-px w-12 bg-linear-to-r from-transparent to-red-500/50" />
          <span className="text-xs font-bold tracking-[0.22em] uppercase text-slate-500">
            Platform Scale
          </span>
          <div className="h-px w-12 bg-linear-to-l from-transparent to-red-500/50" />
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {PLATFORM_STATS.map(({ label, value, description }, idx) => {
            const accent = accentColors[idx % accentColors.length];
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                {/* Vertical divider (not on last) */}
                {idx < PLATFORM_STATS.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-linear-to-b from-transparent via-white/8 to-transparent" />
                )}

                <div className="px-8 py-10 text-center relative">
                  {/* Colored accent line */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full bg-linear-to-r ${accent.line} opacity-70`} />

                  {/* Value */}
                  <div className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-2 tabular">
                    <Counter value={value} />
                  </div>

                  {/* Label */}
                  <div className="text-sm font-semibold text-slate-300 mb-1.5 tracking-wide">
                    {label}
                  </div>

                  {/* Description */}
                  <div className="text-xs text-slate-600 leading-relaxed">
                    {description}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 pt-10 border-t border-white/4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-center"
        >
          {[
            { label: 'Canada', detail: 'Primary Market' },
            { label: 'UK & Ireland', detail: 'Core Region' },
            { label: 'Australia', detail: 'Growing Fast' },
          ].map(({ label, detail }) => (
            <div key={label} className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/60 shrink-0" />
              <span className="text-sm text-slate-400">
                <span className="text-white font-medium">{label}</span>
                <span className="text-slate-600 mx-1.5">·</span>
                <span>{detail}</span>
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
