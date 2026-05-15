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
    <section className="py-24 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <SectionHeader
            eyebrow="Leagues & Tournaments"
            title="Live Standings — See It in Action"
            subtitle={`${league.name} · Season ${league.season}. Your club highlighted, standings updating automatically.`}
          />
          <Link href="/leagues">
            <Button variant="outline" className="border-white/10 text-slate-300 hover:text-white hover:bg-white/5 shrink-0">
              Full Table
              <ArrowRight className="ml-2 w-4 h-4" suppressHydrationWarning />
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden"
        >
          {/* Table header */}
          <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-white/5 bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-yellow-400" suppressHydrationWarning />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{league.name}</div>
                <div className="text-slate-500 text-xs">
                  {formatDate(league.startDate)} – {formatDate(league.endDate)} · {league.teams.length} teams
                </div>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-4 text-xs text-slate-500">
              <Badge className="bg-green-500/15 text-green-400 border border-green-500/20 text-xs">Live</Badge>
              <div className="hidden sm:flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Promotion</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span>Relegation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-2">
            <StandingsTable standings={league.standings} highlightTeamId="t1" compact />
          </div>

          <div className="px-6 py-4 border-t border-white/5 bg-slate-900/30 flex items-center justify-between">
            <p className="text-slate-500 text-xs">Ironclad RFC highlighted in red · 4 matches remaining</p>
            <Link href="/leagues" className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
              Full table & tournament brackets →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
