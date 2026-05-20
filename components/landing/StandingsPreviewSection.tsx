'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StandingsTable } from '@/components/common/StandingsTable';
import { SectionHeader } from '@/components/common/SectionHeader';
import { formatDate } from '@/utils';
import type { League } from '@/types';

interface StandingsPreviewSectionProps {
  league: League;
}

export function StandingsPreviewSection({ league }: StandingsPreviewSectionProps) {
  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#060A14' }}>
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <SectionHeader
            eyebrow="Leagues & Tournaments"
            title="Live Standings — See It in Action"
            subtitle={`${league.name} · Season ${league.season}. Your club highlighted, standings updating automatically.`}
          />
          <Link href="/leagues" className="shrink-0">
            <Button
              variant="outline"
              className="border-white/8 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/15 transition-all duration-200"
            >
              Full Table
              <ArrowRight className="ml-2 w-4 h-4" suppressHydrationWarning />
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="premium-card rounded-2xl overflow-hidden"
        >
          {/* Table header */}
          <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-amber-400" suppressHydrationWarning />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{league.name}</div>
                <div className="text-slate-600 text-xs">
                  {formatDate(league.startDate)} – {formatDate(league.endDate)} · {league.teams.length} teams
                </div>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-5">
              <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5 inline-block" />
                Live
              </Badge>
              <div className="hidden sm:flex items-center gap-5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <div className="w-0.5 h-4 rounded-full bg-emerald-500" />
                  <span>Promotion</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-0.5 h-4 rounded-full bg-red-500" />
                  <span>Relegation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-2 py-1">
            <StandingsTable standings={league.standings} highlightTeamId="t1" compact />
          </div>

          <div className="px-5 py-3.5 border-t border-white/5 flex items-center justify-between">
            <p className="text-slate-700 text-xs">Ironclad RFC highlighted · 4 matches remaining</p>
            <Link
              href="/leagues"
              className="text-red-400 hover:text-red-300 text-xs font-semibold transition-colors duration-200"
            >
              Full table & brackets →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
