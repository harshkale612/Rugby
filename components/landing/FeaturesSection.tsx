'use client';

import { motion } from 'framer-motion';
import { Shield, Users, User, Trophy } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';

const features = [
  {
    icon: Shield,
    label: '01',
    title: 'Club Management',
    tagline: 'Your club. Fully organised.',
    description:
      'Complete club administration in one place — staff records, sponsorships, honours, contact info, and club branding. Present your club professionally and keep everything up to date effortlessly.',
    bullets: [
      'Club profile & branding',
      'Staff & coaching team',
      'Sponsors & partnerships',
      'Honours & achievements',
    ],
    color: 'text-red-400',
    bg: 'from-red-500/10 to-red-900/5',
    border: 'border-red-500/15',
    glow: 'bg-red-500/5',
  },
  {
    icon: Users,
    label: '02',
    title: 'Team & Squad Control',
    tagline: 'Every squad. Under control.',
    description:
      "Manage all your teams — senior, women's, and every age group — from one dashboard. Track performance, assign coaches, monitor form, and see live standings at a glance.",
    bullets: [
      'Multiple team management',
      'Season stats tracking',
      'Coach assignment',
      'League position monitoring',
    ],
    color: 'text-blue-400',
    bg: 'from-blue-500/10 to-blue-900/5',
    border: 'border-blue-500/15',
    glow: 'bg-blue-500/5',
  },
  {
    icon: User,
    label: '03',
    title: 'Player Management',
    tagline: 'Every player. Every stat.',
    description:
      'Rich player profiles with performance metrics, registration status, position data, and career history. Know your squad inside out and track development across seasons.',
    bullets: [
      'Detailed player profiles',
      'Performance statistics',
      'Registration tracking',
      'Injury & availability status',
    ],
    color: 'text-emerald-400',
    bg: 'from-emerald-500/10 to-emerald-900/5',
    border: 'border-emerald-500/15',
    glow: 'bg-emerald-500/5',
  },
  {
    icon: Trophy,
    label: '04',
    title: 'Leagues & Tournaments',
    tagline: 'Competitions made simple.',
    description:
      'Run complete league seasons and knockout tournaments with automated standings, live points tables, and bracket management. Built for the way rugby competitions actually work.',
    bullets: [
      'Live league standings',
      'Bonus point systems',
      'Promotion & relegation zones',
      'Tournament bracket management',
    ],
    color: 'text-yellow-400',
    bg: 'from-yellow-500/10 to-yellow-900/5',
    border: 'border-yellow-500/15',
    glow: 'bg-yellow-500/5',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-28 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Core Modules"
          title="Four Modules. One Platform."
          subtitle="Everything a rugby club needs, built to work together seamlessly."
          centered
        />

        <div className="space-y-6">
          {features.map(({ icon: Icon, label, title, tagline, description, bullets, color, bg, border, glow }, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`relative rounded-3xl border ${border} bg-linear-to-br ${bg} overflow-hidden group hover:border-white/15 transition-all duration-500`}
              >
                {/* Glow blob */}
                <div className={`absolute ${isEven ? 'right-0 top-0' : 'left-0 bottom-0'} w-64 h-64 rounded-full ${glow} blur-3xl opacity-60`} />

                <div className={`relative flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-0`}>
                  {/* Visual panel */}
                  <div className={`lg:w-2/5 p-10 lg:p-14 flex flex-col justify-center border-b lg:border-b-0 ${isEven ? 'lg:border-l' : 'lg:border-r'} border-white/5`}>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-xs font-bold tracking-widest text-slate-600 uppercase">{label}</span>
                      <div className="flex-1 h-px bg-white/5" />
                    </div>

                    <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500`}>
                      <Icon className={`w-8 h-8 ${color}`} suppressHydrationWarning />
                    </div>

                    <p className={`text-xs font-semibold tracking-widest uppercase mb-2 ${color}`}>{tagline}</p>
                    <h3 className="text-3xl font-black text-white leading-tight">{title}</h3>
                  </div>

                  {/* Content panel */}
                  <div className="lg:w-3/5 p-10 lg:p-14 flex flex-col justify-center">
                    <p className="text-slate-300 text-lg leading-relaxed mb-8">{description}</p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${color.replace('text-', 'bg-')} shrink-0`} />
                          <span className="text-slate-400 text-sm">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
