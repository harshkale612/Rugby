'use client';

import { motion } from 'framer-motion';
import { Shield, Users, User, Trophy, Check } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';

const features = [
  {
    icon: Shield,
    label: '01',
    title: 'Club Management',
    tagline: 'Your club. Fully organised.',
    description:
      'Complete club administration in one place — staff records, sponsorships, honours, contact info, and club branding. Present your club professionally.',
    bullets: [
      'Club profile & branding',
      'Staff & coaching team',
      'Sponsors & partnerships',
      'Honours & achievements',
    ],
    accent: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/15', glow: 'bg-red-500/5', gradient: 'from-red-500/8 to-transparent' },
  },
  {
    icon: Users,
    label: '02',
    title: 'Team & Squad Control',
    tagline: 'Every squad. Under control.',
    description:
      "Manage all your teams — senior, women's, and every age group — from one dashboard. Track performance, assign coaches, and monitor form at a glance.",
    bullets: [
      'Multiple team management',
      'Season stats tracking',
      'Coach assignment',
      'League position monitoring',
    ],
    accent: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/15', glow: 'bg-blue-500/5', gradient: 'from-blue-500/8 to-transparent' },
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
    accent: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/15', glow: 'bg-emerald-500/5', gradient: 'from-emerald-500/8 to-transparent' },
  },
  {
    icon: Trophy,
    label: '04',
    title: 'Leagues & Tournaments',
    tagline: 'Competitions made simple.',
    description:
      'Run complete league seasons and knockout tournaments with automated standings, live points tables, and bracket management built for rugby.',
    bullets: [
      'Live league standings',
      'Bonus point systems',
      'Promotion & relegation zones',
      'Tournament bracket management',
    ],
    accent: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/15', glow: 'bg-amber-500/5', gradient: 'from-amber-500/8 to-transparent' },
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ backgroundColor: '#060A14' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Core Modules"
          title="Four Modules. One Platform."
          subtitle="Everything a rugby club needs, built to work together seamlessly."
          centered
        />

        <div className="space-y-4">
          {features.map(({ icon: Icon, label, title, tagline, description, bullets, accent }, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-48px' }}
                transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-3xl border ${accent.border} bg-linear-to-br ${accent.gradient} overflow-hidden group hover:border-white/12 transition-all duration-500`}
              >
                {/* Ambient glow */}
                <div className={`absolute ${isEven ? 'right-0 top-0' : 'left-0 bottom-0'} w-56 h-56 rounded-full ${accent.glow} blur-3xl opacity-50 pointer-events-none`} />

                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-px ${isEven ? 'bg-linear-to-l' : 'bg-linear-to-r'} ${accent.text.replace('text', 'from')}/40 to-transparent`} />

                <div className={`relative flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>

                  {/* Visual panel */}
                  <div className={`lg:w-[42%] p-8 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 ${isEven ? 'lg:border-l' : 'lg:border-r'} border-white/5`}>
                    <div className="flex items-center gap-3 mb-8">
                      <span className="text-xs font-bold tracking-widest text-slate-700 uppercase tabular">
                        {label}
                      </span>
                      <div className="flex-1 h-px bg-white/4" />
                    </div>

                    <div className={`w-14 h-14 rounded-2xl ${accent.bg} border ${accent.border} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500`}>
                      <Icon className={`w-7 h-7 ${accent.text}`} suppressHydrationWarning />
                    </div>

                    <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-2 ${accent.text}`}>
                      {tagline}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      {title}
                    </h3>
                  </div>

                  {/* Content panel */}
                  <div className="lg:w-[58%] p-8 lg:p-12 flex flex-col justify-center">
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
                      {description}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-3 group/item">
                          <div className={`w-5 h-5 rounded-lg ${accent.bg} border ${accent.border} flex items-center justify-center shrink-0`}>
                            <Check className={`w-3 h-3 ${accent.text}`} suppressHydrationWarning />
                          </div>
                          <span className="text-slate-400 text-sm group-hover/item:text-slate-300 transition-colors">{bullet}</span>
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
