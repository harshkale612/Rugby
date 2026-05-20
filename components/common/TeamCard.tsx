'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Trophy, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Team } from '@/types';
import { cn } from '@/utils';
import { TEAM_CATEGORIES } from '@/constants';

interface TeamCardProps {
  team: Team;
  delay?: number;
}

const categoryLabels = Object.fromEntries(TEAM_CATEGORIES.map((c) => [c.value, c.label]));

export function TeamCard({ team, delay = 0 }: TeamCardProps) {
  const winRate = team.stats.played > 0
    ? Math.round((team.stats.won / team.stats.played) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group h-full"
    >
      <Link href={`/team/${team.id}`} className="block h-full">
        <div className="premium-card rounded-2xl overflow-hidden h-full flex flex-col">
          {/* Top accent */}
          <div className="h-0.5 bg-linear-to-r from-red-600 via-red-500/60 to-transparent shrink-0" />

          <div className="p-6 flex flex-col flex-1">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-red-600/20 to-red-900/10 border border-red-500/15 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Users className="w-6 h-6 text-red-400" suppressHydrationWarning />
              </div>
              <Badge
                variant="outline"
                className="bg-white/4 text-slate-400 border-white/8 text-xs"
              >
                {categoryLabels[team.category] ?? team.category}
              </Badge>
            </div>

            {/* Team info */}
            <div className="mb-5 flex-1">
              <h3 className="text-white font-bold text-base mb-1 group-hover:text-red-200 transition-colors duration-200 leading-tight">
                {team.name}
              </h3>
              {team.headCoach && (
                <p className="text-slate-600 text-xs">
                  Coach: <span className="text-slate-400">{team.headCoach.name}</span>
                </p>
              )}
            </div>

            {/* Win rate progress */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-600 uppercase tracking-wider">Win Rate</span>
                <span className={cn(
                  'text-sm font-bold tabular',
                  winRate >= 60 ? 'text-emerald-400' : winRate >= 40 ? 'text-amber-400' : 'text-red-400'
                )}>
                  {winRate}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${winRate}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
                  className={cn(
                    'h-full rounded-full',
                    winRate >= 60
                      ? 'bg-linear-to-r from-emerald-500 to-emerald-400'
                      : winRate >= 40
                      ? 'bg-linear-to-r from-amber-500 to-amber-400'
                      : 'bg-linear-to-r from-red-600 to-red-500'
                  )}
                />
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Played', value: team.stats.played },
                { label: 'Won', value: team.stats.won },
                { label: 'Lost', value: team.stats.lost },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/3 rounded-xl p-3 text-center border border-white/4">
                  <div className="text-xl font-black text-white tabular">{value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-600 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* League position */}
            {team.stats.tablePosition && (
              <div className="mt-4 flex items-center gap-2 pt-4 border-t border-white/5">
                <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" suppressHydrationWarning />
                <span className="text-xs text-slate-500">
                  League position:{' '}
                  <span className="text-white font-bold">#{team.stats.tablePosition}</span>
                </span>
                {team.stats.tablePosition <= 2 && (
                  <TrendingUp className="w-3 h-3 text-emerald-400 ml-auto" suppressHydrationWarning />
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
