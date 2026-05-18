'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  AlertCircle,
  ChevronRight,
  Trophy,
  User,
  Users,
  Activity,
  Shield,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TeamCard } from '@/components/common/TeamCard';
import { StandingsTable } from '@/components/common/StandingsTable';
import { getOverviewMetrics } from '@/features/dashboard/overview-shared';
import type { OverviewContentProps } from '@/features/dashboard/overview-shared';
import { mockLeague } from '@/data';
import { getInitials, calculateAge, cn } from '@/utils';

const statusTone: Record<string, string> = {
  active: 'text-emerald-400',
  injured: 'text-red-400',
  suspended: 'text-amber-400',
  inactive: 'text-slate-500',
};

export function DashboardOverviewCommand({ club, players, teams }: OverviewContentProps) {
  const { activeTeams, injuredPlayers, pendingPlayers, topPlayers, teamPreview } =
    getOverviewMetrics({ club, players, teams });

  const railMetrics = [
    { label: 'Players', value: club.stats.totalPlayers, sub: '+8% season', icon: Users },
    { label: 'Active squads', value: activeTeams, sub: 'teams', icon: Shield },
    { label: 'Win rate', value: `${club.stats.winRate}%`, sub: '+5% vs LY', icon: Activity },
    { label: 'Titles', value: club.stats.leaguesWon, sub: 'leagues won', icon: Trophy },
  ] as const;

  return (
    <div className="space-y-5 md:space-y-6">
      {/* Command rail */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-amber-500/20 bg-slate-900/80 overflow-hidden"
      >
        <div className="border-b border-white/5 px-4 py-2.5 flex items-center justify-between gap-3 bg-amber-500/[0.07]">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-200/80">
            Command deck
          </span>
          <span className="text-xs text-slate-500 truncate max-w-[12rem] sm:max-w-none">{club.name}</span>
        </div>
        <div className="flex gap-0 overflow-x-auto snap-x snap-mandatory py-3 px-3 sm:px-4">
          {railMetrics.map(({ label, value, sub, icon: Icon }, i) => (
            <div
              key={label}
              className={cn(
                'snap-start shrink-0 flex-1 min-w-[140px] sm:min-w-0 px-4 py-2 border-r border-white/5 last:border-r-0',
                i === 0 && 'pl-2'
              )}
            >
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Icon className="w-3.5 h-3.5 text-amber-500/80" />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">{label}</span>
              </div>
              <div className="text-xl sm:text-2xl font-black tabular-nums text-white tracking-tight">{value}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
        {/* Standings — primary column */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="lg:col-span-7 flex flex-col min-h-0"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              League table
            </h3>
            <Link
              href="/dashboard/leagues"
              className="text-xs text-amber-500/80 hover:text-amber-400 flex items-center gap-0.5 transition-colors"
            >
              Expand <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex-1 rounded-2xl border border-white/10 border-l-4 border-l-amber-500 bg-slate-900/50 overflow-hidden">
            <div className="px-2 sm:px-3 py-2">
              <StandingsTable standings={mockLeague.standings} highlightTeamId="t1" compact />
            </div>
          </div>
        </motion.div>

        {/* Side rail: alerts + roster */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-5 flex flex-col gap-5"
        >
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              Signals
            </h3>
            <div className="flex flex-wrap gap-2">
              {injuredPlayers > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1.5 text-xs text-red-200">
                  {injuredPlayers} injured
                </span>
              )}
              {pendingPlayers > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-100">
                  {pendingPlayers} pending
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-100">
                #2 in league
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-600/60 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-300">
                {activeTeams} squads live
              </span>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-teal-400" />
                Top try scorers
              </h3>
              <Link href="/dashboard/players" className="text-xs text-teal-500/80 hover:text-teal-400 transition-colors">
                Roster →
              </Link>
            </div>
            <div className="space-y-2">
              {topPlayers.map((player, i) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05 }}
                >
                  <Link
                    href={`/player/${player.id}`}
                    className="flex items-center gap-3 rounded-xl border border-white/8 bg-slate-950/50 px-3 py-2.5 hover:border-teal-500/30 hover:bg-slate-900/70 transition-all group"
                  >
                    <Avatar className="h-10 w-10 border border-white/10">
                      <AvatarImage src={player.avatar} alt={player.name} />
                      <AvatarFallback className="bg-teal-600/25 text-teal-200 text-xs font-bold">
                        {getInitials(player.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white truncate group-hover:text-teal-100 transition-colors">
                          {player.name}
                        </span>
                        <span className={cn('text-[10px] font-semibold uppercase', statusTone[player.status])}>
                          {player.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {player.position}
                        {player.dateOfBirth ? ` · ${calculateAge(player.dateOfBirth)} yrs` : ''}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold text-amber-400 tabular-nums">{player.stats.tries}</div>
                      <div className="text-[10px] uppercase tracking-wide text-slate-500">tries</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Teams — horizontal deck */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Users className="w-4 h-4 text-sky-400" />
            Squad decks
          </h3>
          <Link href="/dashboard/teams" className="text-xs text-sky-500/80 hover:text-sky-400 transition-colors">
            All teams →
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-1 snap-x snap-mandatory -mx-1 px-1">
          {teamPreview.map((t, i) => (
            <div key={t.id} className="snap-start shrink-0 w-[min(100%,320px)] sm:w-80">
              <TeamCard team={t} delay={i * 0.06} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
