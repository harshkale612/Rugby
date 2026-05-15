'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Shield, Users, User, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const modules = [
  { icon: Shield, label: 'Club Management', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { icon: Users, label: 'Team & Squad Control', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { icon: User, label: 'Player Management', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { icon: Trophy, label: 'Leagues & Tournaments', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-red-950/30" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
          suppressHydrationWarning
        />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-red-600/8 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16"
      >
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-1.5 text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2 animate-pulse inline-block" />
              Purpose-Built for Rugby Clubs
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight mb-6"
          >
            Run Your
            <br />
            <span className="bg-linear-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Rugby Club
            </span>
            <br />
            Like a Pro
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-400 text-xl sm:text-2xl max-w-2xl leading-relaxed mb-10"
          >
            Four powerful modules. One platform. Everything your club needs to
            manage teams, players, and leagues professionally.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 text-base font-semibold shadow-2xl shadow-red-900/40 hover:shadow-red-800/50 transition-all duration-300 group h-auto"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" suppressHydrationWarning />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="lg"
                className="text-slate-300 hover:text-white hover:bg-white/5 px-6 py-4 text-base h-auto border border-white/10 hover:border-white/20"
              >
                View Demo Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Module cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl w-full"
          >
            {modules.map(({ icon: Icon, label, color, bg, border }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.65 + idx * 0.07 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className={`${bg} border ${border} rounded-2xl p-4 text-center backdrop-blur-sm`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} suppressHydrationWarning />
                <div className="text-xs text-slate-300 font-medium leading-tight">{label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-slate-600"
            >
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <ChevronDown className="w-4 h-4" suppressHydrationWarning />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}
