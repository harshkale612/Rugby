'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Sparkles, Trophy, User, Users } from 'lucide-react';
import Link from 'next/link';
import { StatCard } from '@/components/common/StatCard';
import { PlayerCard } from '@/components/common/PlayerCard';
import { TeamCard } from '@/components/common/TeamCard';
import { StandingsTable } from '@/components/common/StandingsTable';
import { getOverviewMetrics } from '@/features/dashboard/overview-shared';
import type { OverviewContentProps } from '@/features/dashboard/overview-shared';
import { mockLeague } from '@/data';

export function DashboardOverviewBento({ club, players, teams }: OverviewContentProps) {
  const { activeTeams, injuredPlayers, pendingPlayers, topPlayers, teamPreview } =
    getOverviewMetrics({ club, players, teams });

  return (
    <div className="relative space-y-4 md:space-y-5">
      <div
        className="pointer-events-none absolute -inset-x-4 -top-4 h-64 rounded-[2rem] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-600/15 via-fuchsia-600/5 to-transparent opacity-80"
        aria-hidden
      />

      {/* Hero + stat mosaic */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-fuchsia-500/25 bg-gradient-to-br from-fuchsia-600/30 via-violet-900/25 to-slate-950/90 p-6 sm:p-7 shadow-2xl shadow-violet-950/40 backdrop-blur-xl"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-fuchsia-100/90">
              <Sparkles className="h-3.5 w-3.5" />
              Club pulse
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {club.name}
            </h2>
            <p className="mt-2 text-sm text-violet-100/70 leading-relaxed">
              Live snapshot of squads, league pressure, and roster health — bento layout.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-fuchsia-200/60">
                Win rate
              </p>
              <p className="mt-1 text-4xl font-black tabular-nums text-white">{club.stats.winRate}%</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-fuchsia-200/60">
                Active teams
              </p>
              <p className="mt-1 text-4xl font-black tabular-nums text-white">{activeTeams}</p>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-8 grid grid-cols-2 gap-3 sm:gap-4">
          <StatCard
            title="Total Players"
            value={club.stats.totalPlayers}
            icon="Users"
            trend={{ value: 8, label: 'this season' }}
            variant="glass"
            delay={0.04}
            className="rounded-2xl sm:rounded-3xl border-cyan-500/15"
          />
          <StatCard
            title="Leagues Won"
            value={club.stats.leaguesWon}
            icon="Trophy"
            variant="glass"
            delay={0.1}
            className="rounded-2xl sm:rounded-3xl border-amber-500/15"
          />
          <StatCard
            title="Active Teams"
            value={activeTeams}
            icon="Shield"
            variant="glass"
            delay={0.16}
            className="rounded-2xl sm:rounded-3xl"
          />
          <StatCard
            title="Win Rate"
            value={`${club.stats.winRate}%`}
            icon="TrendingUp"
            trend={{ value: 5, label: 'vs last season' }}
            variant="gradient"
            delay={0.22}
            className="rounded-2xl sm:rounded-3xl"
          />
        </div>
      </div>

      {/* Teams + standings */}
      <div className="relative grid grid-cols-1 xl:grid-cols-12 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="xl:col-span-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold flex items-center gap-2 text-sm sm:text-base">
              <Users className="w-4 h-4 text-cyan-400" />
              Active Teams
            </h3>
            <Link
              href="/dashboard/teams"
              className="text-xs text-slate-500 hover:text-fuchsia-300 transition-colors"
            >
              Manage all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
            {teamPreview.map((t, i) => (
              <TeamCard key={t.id} team={t} delay={i * 0.06} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          className="xl:col-span-7 rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-cyan-950/25 to-slate-950/60 p-4 sm:p-5 shadow-xl shadow-cyan-950/20 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-300" />
              League Standings
            </h3>
            <Link
              href="/dashboard/leagues"
              className="text-xs text-cyan-200/50 hover:text-cyan-200 transition-colors"
            >
              Full table →
            </Link>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden">
            <div className="px-1 sm:px-2">
              <StandingsTable standings={mockLeague.standings} highlightTeamId="t1" compact />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Alerts + performers */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="lg:col-span-4 rounded-3xl border border-violet-500/20 bg-violet-950/20 p-5 backdrop-blur-md"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-300" />
            Club Alerts
          </h3>
          <div className="space-y-2.5">
            {injuredPlayers > 0 && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-sm text-slate-200">
                <span className="text-red-300 font-medium">{injuredPlayers}</span> injured
              </div>
            )}
            {pendingPlayers > 0 && (
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-3 py-2.5 text-sm text-slate-200">
                <span className="text-amber-200 font-medium">{pendingPlayers}</span> pending approval
              </div>
            )}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2.5 text-sm text-slate-200">
              League <span className="text-white font-semibold">#2</span> — 8pts off top
            </div>
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-3 py-2.5 text-sm text-slate-200">
              {activeTeams} teams active this season
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.26 }}
          className="lg:col-span-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-400" />
              Top Performers
            </h3>
            <Link
              href="/dashboard/players"
              className="text-xs text-slate-500 hover:text-fuchsia-300 transition-colors"
            >
              All players →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {topPlayers.map((player, i) => (
              <PlayerCard key={player.id} player={player} compact delay={i * 0.07} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
