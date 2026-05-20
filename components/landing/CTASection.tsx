'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Shield, Users, User, Trophy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  'Free forever for clubs under 50 players',
  'No credit card required',
  'Setup in under 5 minutes',
  'All four modules included',
];

const modules = [
  { icon: Shield, label: 'Club Management', color: 'text-red-400', bg: 'bg-red-500/10' },
  { icon: Users, label: 'Team & Squad', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: User, label: 'Player Profiles', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Trophy, label: 'League Tables', color: 'text-amber-400', bg: 'bg-amber-500/10' },
];

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-0" style={{ backgroundColor: '#060A14' }}>
      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 50% 100%, rgba(220,38,38,0.08) 0%, transparent 65%)',
        }}
      />
      {/* Top border gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold px-3.5 py-1.5 rounded-full mb-8 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              Join 250+ Rugby Clubs Worldwide
            </div>

            {/* Headline */}
            <h2 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black text-white leading-[0.95] tracking-tight mb-6">
              Ready to Run
              <br />
              <span className="gradient-text">Your Club</span>
              <br />
              Like a Pro?
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg">
              Get the complete rugby management platform — club admin, squad control,
              player tracking, and live league tables — in one powerful tool.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" suppressHydrationWarning />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="group bg-red-600 hover:bg-red-500 text-white px-8 h-14 text-base font-bold shadow-2xl shadow-red-950/50 hover:shadow-red-900/60 glow-red-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" suppressHydrationWarning />
                </Button>
              </Link>
              <Link href="/club/1">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-slate-400 hover:text-white hover:bg-white/5 px-6 h-14 text-base border border-white/8 hover:border-white/15 transition-all duration-200"
                >
                  View Demo Club
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right — Module showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-3xl bg-red-500/5 blur-2xl" />

            <div className="relative premium-card rounded-3xl p-8 sm:p-10">
              {/* Card header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                    Platform Modules
                  </p>
                  <h3 className="text-white font-bold text-xl">Everything in one place</h3>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  All included
                </div>
              </div>

              {/* Module cards */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {modules.map(({ icon: Icon, label, color, bg }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className="bg-white/[0.03] border border-white/6 rounded-2xl p-5 hover:bg-white/5 hover:border-white/10 transition-all duration-200 group"
                  >
                    <div className={`w-10 h-10 ${bg} border border-white/8 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200`}>
                      <Icon className={`w-5 h-5 ${color}`} suppressHydrationWarning />
                    </div>
                    <p className="text-white text-sm font-semibold leading-tight">{label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Bottom promo */}
              <div className="bg-linear-to-r from-red-950/40 to-transparent border border-red-500/10 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/20 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-red-400" suppressHydrationWarning />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold mb-0.5">Start in minutes</p>
                  <p className="text-slate-500 text-xs">Import your existing data or start fresh — full onboarding included.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
