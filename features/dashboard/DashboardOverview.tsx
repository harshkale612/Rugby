'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Users, User, Trophy, TrendingUp, CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';
import { StatCard } from '@/components/common/StatCard';
import { PlayerCard } from '@/components/common/PlayerCard';
import { TeamCard } from '@/components/common/TeamCard';
import { StandingsTable } from '@/components/common/StandingsTable';
import type { Club, Player, Team } from '@/types';
import { mockLeague } from '@/data';
import { getOverviewMetrics } from '@/features/dashboard/overview-shared';

interface DashboardOverviewProps {
  club: Club;
  players: Player[];
  teams: Team[];
}

function SectionTitle({ children, href, linkLabel }: { children: React.ReactNode; href: string; linkLabel: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-white font-bold text-sm flex items-center gap-2">{children}</h2>
      <Link href={href} className="text-slate-600 hover:text-red-400 text-xs font-medium transition-colors duration-200">
        {linkLabel} →
      </Link>
    </div>
  );
}

export function DashboardOverview({ club, players, teams }: DashboardOverviewProps) {
  const { activeTeams, injuredPlayers, pendingPlayers } = getOverviewMetrics({ club, players, teams });

  return (
    <div className="space-y-6">
      {/* KPI Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Players" value={club.stats.totalPlayers} icon="Users" trend={{ value: 8, label: 'this season' }} delay={0} />
        <StatCard title="Active Teams" value={activeTeams} icon="Shield" delay={0.06} />
        <StatCard title="Win Rate" value={`${club.stats.winRate}%`} icon="TrendingUp" trend={{ value: 5, label: 'vs last season' }} variant="gradient" delay={0.12} />
        <StatCard title="Leagues Won" value={club.stats.leaguesWon} icon="Trophy" delay={0.18} />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Left col: Teams + Standings */}
        <div className="xl:col-span-2 space-y-5">
          {/* Teams */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <SectionTitle href="/dashboard/teams" linkLabel="All teams">
              <Users className="w-4 h-4 text-blue-400" suppressHydrationWarning />
              Active Teams
            </SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teams.slice(0, 2).map((t, i) => (
                <TeamCard key={t.id} team={t} delay={i * 0.06} />
              ))}
            </div>
          </motion.div>

          {/* League standings */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionTitle href="/dashboard/leagues" linkLabel="Full table">
              <Trophy className="w-4 h-4 text-amber-400" suppressHydrationWarning />
              League Standings
            </SectionTitle>
            <div className="premium-card rounded-2xl overflow-hidden">
              <div className="px-2 py-1">
                <StandingsTable standings={mockLeague.standings} highlightTeamId="t1" compact />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right col: Alerts + Top Players */}
        <div className="space-y-5">
          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" suppressHydrationWarning />
                Club Alerts
              </h2>
              <span className="text-xs text-slate-600">{injuredPlayers + pendingPlayers + 2} active</span>
            </div>
            <div className="premium-card rounded-2xl p-4 space-y-2.5">
              {injuredPlayers > 0 && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                  <Circle className="w-2.5 h-2.5 text-red-400 shrink-0 mt-1 fill-red-400" suppressHydrationWarning />
                  <span className="text-sm text-slate-300">
                    <span className="text-white font-semibold">{injuredPlayers}</span> player{injuredPlayers > 1 ? 's' : ''} currently injured
                  </span>
                </div>
              )}
              {pendingPlayers > 0 && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                  <Circle className="w-2.5 h-2.5 text-amber-400 shrink-0 mt-1 fill-amber-400" suppressHydrationWarning />
                  <span className="text-sm text-slate-300">
                    <span className="text-white font-semibold">{pendingPlayers}</span> registration{pendingPlayers > 1 ? 's' : ''} pending approval
                  </span>
                </div>
              )}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" suppressHydrationWarning />
                <span className="text-sm text-slate-300">
                  League position: <span className="text-white font-bold">#2</span> — 8 pts behind leaders
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" suppressHydrationWarning />
                <span className="text-sm text-slate-300">
                  <span className="text-white font-bold">{activeTeams}</span> teams active this season
                </span>
              </div>
            </div>
          </motion.div>

          {/* Top performers */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <SectionTitle href="/dashboard/players" linkLabel="All players">
              <User className="w-4 h-4 text-emerald-400" suppressHydrationWarning />
              Top Performers
            </SectionTitle>
            <div className="space-y-3">
              {players
                .filter((p) => p.status === 'active')
                .sort((a, b) => b.stats.tries - a.stats.tries)
                .slice(0, 3)
                .map((player, i) => (
                  <PlayerCard key={player.id} player={player} compact delay={i * 0.06} />
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
