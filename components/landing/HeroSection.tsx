'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Shield, Users, User, Trophy,
  LayoutDashboard, TrendingUp, ChevronRight,
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Mock data powering the dashboard preview ────────────────────────────────

const MOCK_STATS = [
  { v: '124', l: 'Players',  color: '#f87171', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.14)' },
  { v: '8',   l: 'Teams',    color: '#60a5fa', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.14)' },
  { v: '76%', l: 'Win Rate', color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.14)' },
  { v: '3',   l: 'Trophies', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.14)' },
];

const MOCK_TABLE = [
  { pos: 1, name: 'Ironclad RFC',  pts: 38, us: true  },
  { pos: 2, name: 'Valley Hawks',  pts: 35, us: false },
  { pos: 3, name: 'Blue Ridge FC', pts: 31, us: false },
  { pos: 4, name: 'Northfield',    pts: 27, us: false },
];

const MOCK_PLAYERS = [
  { initials: 'JW', name: 'J. Williams', pos: 'Fly-half', tries: 12 },
  { initials: 'MD', name: 'M. Davies',   pos: 'Fullback', tries: 9  },
];

const SIDEBAR_ICONS = [LayoutDashboard, Users, User, Trophy];

// ─── Dashboard Preview ───────────────────────────────────────────────────────

function DashboardPreview() {
  return (
    <div className="relative w-full">

      {/* Ambient glow behind window */}
      <div
        className="absolute -inset-12 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 52% 50%, rgba(220,38,38,0.13) 0%, rgba(59,130,246,0.06) 55%, transparent 100%)',
          filter: 'blur(24px)',
        }}
      />

      {/* ── Floating chip — top right ── */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.05, ease: EASE }}
        className="absolute -top-5 right-6 z-20 flex items-center gap-2 bg-slate-900/95 border border-white/10 rounded-full pl-2.5 pr-4 py-1.5 shadow-2xl shadow-black/60 backdrop-blur-md"
      >
        <div className="flex -space-x-1.5">
          {[
            { bg: '#ef4444', letter: 'I' },
            { bg: '#3b82f6', letter: 'V' },
            { bg: '#10b981', letter: 'B' },
          ].map(({ bg, letter }) => (
            <div
              key={letter}
              className="w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center text-[7px] font-black text-white"
              style={{ backgroundColor: bg }}
            >
              {letter}
            </div>
          ))}
        </div>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-white font-semibold">12 clubs joined today</span>
      </motion.div>

      {/* ── Floating stat chip — bottom left ── */}
      <motion.div
        initial={{ opacity: 0, x: -12, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2, ease: EASE }}
        className="absolute -bottom-6 -left-4 z-20 flex items-center gap-3 bg-slate-900/95 border border-white/10 rounded-2xl p-3 shadow-2xl shadow-black/60 backdrop-blur-md"
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.18)' }}
        >
          <TrendingUp className="w-4 h-4 text-emerald-400" suppressHydrationWarning />
        </div>
        <div>
          <p className="text-[10px] text-slate-500 leading-tight">Win rate this season</p>
          <p className="text-sm font-black text-white tabular">
            76%{' '}
            <span className="text-emerald-400 text-xs font-bold">↑ +5%</span>
          </p>
        </div>
      </motion.div>

      {/* ── Main browser window ── */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, delay: 0.48, ease: EASE }}
        className="relative overflow-hidden"
        style={{
          borderRadius: '18px',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow:
            '0 48px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03) inset',
        }}
      >
        {/* Chrome bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5"
          style={{ background: '#0D1424' }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(239,68,68,0.6)' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(251,191,36,0.6)' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(52,211,153,0.6)' }} />
          </div>
          <div className="flex-1 mx-4 flex justify-center">
            <div
              className="flex items-center gap-1.5 rounded-md px-3 py-1"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono" style={{ color: '#475569' }}>
                rugbyhub.com/dashboard
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar + content */}
        <div className="flex" style={{ background: '#080C18', height: '368px' }}>

          {/* Sidebar */}
          <div
            className="w-14 border-r border-white/5 flex flex-col items-center pt-3 pb-3 gap-2 shrink-0"
            style={{ background: '#060A14' }}
          >
            {/* Logo mark */}
            <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-1 shadow-md" style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}>
              <Shield className="w-3.5 h-3.5 text-white" suppressHydrationWarning />
            </div>

            {SIDEBAR_ICONS.map((Icon, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={
                  i === 0
                    ? { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.18)' }
                    : {}
                }
              >
                <Icon
                  className="w-3.5 h-3.5"
                  style={{ color: i === 0 ? '#f87171' : '#334155' }}
                  suppressHydrationWarning
                />
              </div>
            ))}
          </div>

          {/* Main panel */}
          <div className="flex-1 p-4 space-y-3 overflow-hidden">

            {/* Header row skeleton */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="h-2 w-12 rounded" style={{ background: '#1e293b' }} />
                  <div className="h-1.5 w-1 rounded" style={{ background: '#1e293b' }} />
                  <div className="h-2.5 w-24 rounded" style={{ background: 'rgba(255,255,255,0.2)' }} />
                </div>
                <div className="h-1.5 w-32 rounded" style={{ background: '#0f172a' }} />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }} />
                <div className="relative">
                  <div className="w-6 h-6 rounded-full" style={{ background: 'rgba(220,38,38,0.2)', border: '1px solid rgba(239,68,68,0.2)' }} />
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900" />
                </div>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-1.5">
              {MOCK_STATS.map(({ v, l, color, bg, border }) => (
                <div
                  key={l}
                  className="rounded-xl p-2 relative overflow-hidden"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, ${color}50, transparent)` }}
                  />
                  <div className="text-xs font-black tabular leading-tight mb-0.5" style={{ color }}>
                    {v}
                  </div>
                  <div className="text-[8px]" style={{ color: '#475569' }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Standings table */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
            >
              {/* Table header */}
              <div
                className="flex items-center gap-2 px-3 py-1.5 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <Trophy className="w-2.5 h-2.5 text-amber-400 shrink-0" suppressHydrationWarning />
                <div className="h-1.5 w-20 rounded flex-1" style={{ background: 'rgba(255,255,255,0.12)' }} />
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="h-1.5 w-7 rounded-full" style={{ background: 'rgba(52,211,153,0.15)' }} />
                </div>
              </div>

              {MOCK_TABLE.map(({ pos, name, pts, us }, i) => (
                <div
                  key={pos}
                  className="flex items-center gap-2 px-3 py-1.5"
                  style={{
                    background: us ? 'rgba(239,68,68,0.06)' : 'transparent',
                    borderBottom: i < MOCK_TABLE.length - 1 ? '1px solid rgba(255,255,255,0.025)' : 'none',
                  }}
                >
                  {/* Position indicator */}
                  <div
                    className="w-0.5 h-3.5 rounded-full shrink-0"
                    style={{ background: us ? '#ef4444' : 'transparent' }}
                  />
                  <span className="text-[8px] tabular w-3" style={{ color: '#475569' }}>{pos}</span>
                  <span
                    className="text-[9px] flex-1 font-medium"
                    style={{ color: us ? '#f8fafc' : '#64748b' }}
                  >
                    {name}
                  </span>
                  {us && (
                    <span
                      className="text-[7px] font-bold px-1.5 rounded-full"
                      style={{
                        color: '#f87171',
                        background: 'rgba(239,68,68,0.12)',
                        border: '1px solid rgba(239,68,68,0.18)',
                      }}
                    >
                      You
                    </span>
                  )}
                  <span
                    className="text-[9px] font-black tabular"
                    style={{ color: us ? '#f87171' : '#cbd5e1' }}
                  >
                    {pts}
                  </span>
                </div>
              ))}
            </div>

            {/* Player row */}
            <div className="grid grid-cols-2 gap-1.5">
              {MOCK_PLAYERS.map(({ initials, name, pos, tries }) => (
                <div
                  key={name}
                  className="rounded-xl p-2 flex items-center gap-2"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[8px] font-black text-white"
                    style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] text-white font-medium truncate">{name}</div>
                    <div className="text-[8px] font-semibold" style={{ color: '#f87171' }}>{pos}</div>
                  </div>
                  <div className="text-[9px] font-black tabular text-emerald-400">{tries}T</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Module pills ─────────────────────────────────────────────────────────────

const MODULES = [
  { icon: Shield, label: 'Club Admin',       color: 'text-red-400' },
  { icon: Users,  label: 'Team Squads',      color: 'text-blue-400' },
  { icon: User,   label: 'Player Profiles',  color: 'text-emerald-400' },
  { icon: Trophy, label: 'Live Standings',   color: 'text-amber-400' },
];

const TRUST = [
  { value: '250+', label: 'Rugby Clubs' },
  { value: '12k+', label: 'Players' },
  { value: '180+', label: 'Leagues' },
];

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-7%']);
  const previewY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section
      ref={ref}
      className="relative min-h-svh flex items-center overflow-hidden"
      style={{ backgroundColor: '#060A14' }}
    >
      {/* ── Background layers ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {/* Fine grid */}
        <div className="absolute inset-0 grid-pattern opacity-35" />

        {/* Red ambient orb — upper left */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-5%', left: '-10%',
            width: '65%', height: '70%',
            background: 'radial-gradient(circle, rgba(220,38,38,0.22) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />

        {/* Blue accent orb — right */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '20%', right: '-5%',
            width: '45%', height: '55%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      </motion.div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-28 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-center">

          {/* Left — copy */}
          <motion.div style={{ y: contentY }} className="space-y-0">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/8 bg-white/4 backdrop-blur-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Now Available Worldwide
              </span>
              <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" suppressHydrationWarning />
            </motion.div>

            {/* Headline — line-by-line reveal */}
            <div className="mb-6 leading-none">
              {/* "Run Your" — outline treatment */}
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '108%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                  className="block font-black uppercase tracking-tighter leading-none select-none"
                  style={{
                    fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
                    WebkitTextStroke: '2px rgba(255,255,255,0.2)',
                    color: 'transparent',
                  }}
                >
                  Run Your
                </motion.span>
              </div>

              {/* "Rugby Club" — solid white */}
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '108%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.19, ease: EASE }}
                  className="block font-black uppercase tracking-tighter leading-none text-white select-none"
                  style={{
                    fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
                    textShadow: '0 0 100px rgba(239,68,68,0.2)',
                  }}
                >
                  Rugby Club
                </motion.span>
              </div>

              {/* "Like a Pro." — gradient */}
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '108%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
                  className="block font-black uppercase tracking-tighter leading-none gradient-text select-none"
                  style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)' }}
                >
                  Like a Pro.
                </motion.span>
              </div>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: EASE }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-md"
            >
              Complete club management, live standings, squad control, and player
              tracking — built specifically for rugby.
            </motion.p>

            {/* Module pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52, ease: EASE }}
              className="flex flex-wrap gap-2 mb-9"
            >
              {MODULES.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/4 border border-white/6 hover:bg-white/7 hover:border-white/12 transition-all duration-200 cursor-default"
                >
                  <Icon className={`w-3 h-3 ${color} shrink-0`} suppressHydrationWarning />
                  <span className="text-xs font-medium text-slate-300">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-12"
            >
              <Link href="/signup">
                <button className="group flex items-center gap-2.5 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-xl shadow-red-950/50 hover:shadow-red-900/60 hover:scale-[1.02] active:scale-[0.98]">
                  Start for Free
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    suppressHydrationWarning
                  />
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="group flex items-center gap-2.5 px-6 py-4 text-slate-400 hover:text-white text-sm font-semibold border border-white/8 hover:border-white/18 rounded-xl hover:bg-white/4 transition-all duration-200">
                  View Dashboard
                  <ChevronRight
                    className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                    suppressHydrationWarning
                  />
                </button>
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.72 }}
              className="flex flex-wrap items-center gap-6"
            >
              {TRUST.map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-5">
                  {i > 0 && <div className="w-px h-5 bg-white/8" />}
                  <div>
                    <span className="text-white font-black text-xl tabular">{value} </span>
                    <span className="text-slate-600 text-sm">{label}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Dashboard preview (desktop only) */}
          <motion.div
            style={{ y: previewY }}
            className="hidden lg:block"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade-to-section */}
      <div
        className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #060A14, transparent)' }}
      />
    </section>
  );
}
