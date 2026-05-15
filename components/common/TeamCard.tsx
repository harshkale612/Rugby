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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link href={`/team/${team.id}`}>
        <div className="bg-slate-800/40 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 hover:bg-slate-800/60 transition-all duration-300 h-full">
          {/* Color bar */}
          <div className="h-1 bg-gradient-to-r from-red-600 to-red-400" />

          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-600/20 to-red-900/20 border border-red-500/20 flex items-center justify-center">
                <Users className="w-7 h-7 text-red-400" />
              </div>
              <Badge variant="outline" className="bg-white/5 text-slate-400 border-white/10 text-xs">
                {categoryLabels[team.category] ?? team.category}
              </Badge>
            </div>

            {/* Name */}
            <h3 className="text-white font-bold text-lg mb-1 group-hover:text-red-300 transition-colors">
              {team.name}
            </h3>
            {team.headCoach && (
              <p className="text-slate-500 text-sm mb-5">Coach: {team.headCoach.name}</p>
            )}

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Played', value: team.stats.played, icon: null },
                { label: 'Won', value: team.stats.won, icon: null },
                { label: 'Win %', value: `${winRate}%`, icon: null },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/3 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-white">{value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Position badge */}
            {team.stats.tablePosition && (
              <div className="mt-4 flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-slate-400">
                  Position: <span className="text-white font-semibold">#{team.stats.tablePosition}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
