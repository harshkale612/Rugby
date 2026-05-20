'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Users, Shield, Calendar } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface ClubStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface ClubHeroProps {
  clubName?: { line1: string; line2: string };
  tagline?: string;
  location?: string;
  stats?: ClubStat[];
  clubBgImage?: string;
  clubFeatureImage?: string;
  joinHref?: string;
  dashboardsHref?: string;
}

const DEFAULT_STATS: ClubStat[] = [
  { icon: Users, value: '450', label: 'Active Members' },
  { icon: Shield, value: '12', label: 'Teams' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection({
  clubName = { line1: 'ROYAL', line2: 'RUGBY' },
  tagline = 'Est. 1920 · Premier Rugby Club Management',
  location = 'London, England',
  stats = DEFAULT_STATS,
  clubBgImage,
  clubFeatureImage,
  joinHref = '/signup',
  dashboardsHref = '/dashboard',
}: ClubHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const featureY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{ backgroundColor: '#0A0F1C' }}
    >
      {/* ── Background Layer (parallax) ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        {clubBgImage ? (
          <>
            <Image src={clubBgImage} alt="" fill className="object-cover opacity-20" priority />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(10,15,28,0.3) 0%, #0A0F1C 85%)',
              }}
            />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0 mix-blend-overlay opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px',
              }}
            />
            <div
              className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[120px]"
              style={{ backgroundColor: 'rgba(220,38,38,0.18)' }}
            />
          </>
        )}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      {/* ── Right-Side Feature Image ── */}
      {clubFeatureImage && (
        <motion.div
          style={{ y: featureY }}
          className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:block pointer-events-none"
        >
          <Image
            src={clubFeatureImage}
            alt="Club Feature"
            fill
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, #0A0F1C 0%, transparent 40%)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, #0A0F1C 0%, transparent 35%)' }}
          />
        </motion.div>
      )}

      {/* ── Left-Side Content ── */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 pt-28 pb-20"
      >
        <div className={clubFeatureImage ? 'lg:max-w-[50%]' : 'max-w-2xl'}>

          {/* Identity Badge */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
              Rugby Club Profile
            </span>
          </motion.div>

          {/* Club Name */}
          <div className="mb-5 leading-none">
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="block text-[3.5rem] sm:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem] font-black uppercase tracking-tight leading-none"
              style={{
                WebkitTextStroke: '2px rgba(255,255,255,0.25)',
                color: 'transparent',
              }}
            >
              {clubName.line1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="block text-[3.5rem] sm:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem] font-black uppercase tracking-tight leading-none text-white -mt-2 ml-1 sm:ml-2"
              style={{ textShadow: '0 0 60px rgba(239,68,68,0.25)' }}
            >
              {clubName.line2}
            </motion.span>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="text-base sm:text-lg leading-relaxed mb-5 max-w-md"
            style={{ color: '#94A3B8' }}
          >
            {tagline}
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
            className="flex items-center gap-2 mb-8"
          >
            <MapPin className="w-4 h-4 text-red-500 shrink-0" suppressHydrationWarning />
            <span className="text-sm text-white/50">{location}</span>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className="flex items-center gap-6 mb-10"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-4">
                {idx > 0 && <div className="w-px h-10 bg-white/10 shrink-0" />}
                <div className="flex items-center gap-3">
                  <stat.icon className="w-5 h-5 text-red-400 shrink-0" suppressHydrationWarning />
                  <div>
                    <p className="text-xl font-black font-mono text-white leading-none">
                      {stat.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Link href={joinHref}>
              <button className="group flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-[0.12em] text-sm rounded-xl transition-all duration-300 shadow-lg shadow-red-900/40 hover:shadow-red-700/50 hover:scale-[1.02] active:scale-[0.98]">
                Join The Club
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  suppressHydrationWarning
                />
              </button>
            </Link>
            <Link href={dashboardsHref}>
              <button className="group flex items-center gap-3 pl-1 pr-4 py-2 text-white/55 hover:text-white font-semibold uppercase tracking-[0.12em] text-sm transition-all duration-300">
                <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 group-hover:border-white/35 bg-white/5 backdrop-blur-sm transition-all duration-300">
                  <Calendar className="w-4 h-4" suppressHydrationWarning />
                </span>
                View Dashboards
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade-out */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0A0F1C, transparent)' }}
      />
    </section>
  );
}
