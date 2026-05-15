'use client';

import { motion } from 'framer-motion';
import { Activity, AlertCircle, Clock, Users, Shield, User, Trophy } from 'lucide-react';
import Link from 'next/link';
import { StatCard } from '@/components/common/StatCard';
import { PlayerCard } from '@/components/common/PlayerCard';
import { TeamCard } from '@/components/common/TeamCard';
import { StandingsTable } from '@/components/common/StandingsTable';
import type { Club, Player, Team } from '@/types';
import { mockLeague } from '@/data';

interface DashboardOverviewProps {
  club: Club;
  players: Player[];
  teams: Team[];
}

export function DashboardOverview({ club, players, teams }: DashboardOverviewProps) {
  const activeTeams = teams.filter((t) => t.status === 'active').length;
  const injuredPlayers = players.filter((p) => p.status === 'injured').length;
  const pendingPlayers = players.filter((p) => p.registrationStatus === 'pending').length;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Players"
          value={club.stats.totalPlayers}
          icon="Users"
          trend={{ value: 8, label: 'this season' }}
          delay={0}
        />
        <StatCard
          title="Active Teams"
          value={activeTeams}
          icon="Shield"
          delay={0.08}
        />
        <StatCard
          title="Win Rate"
          value={`${club.stats.winRate}%`}
          icon="TrendingUp"
          trend={{ value: 5, label: 'vs last season' }}
          variant="gradient"
          delay={0.16}
        />
        <StatCard
          title="Leagues Won"
          value={club.stats.leaguesWon}
          icon="Trophy"
          delay={0.24}
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Teams + League */}
        <div className="xl:col-span-2 space-y-6">
          {/* Teams */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                Active Teams
              </h2>
              <Link href="/dashboard/teams" className="text-slate-500 hover:text-red-400 text-xs transition-colors">
                Manage all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teams.slice(0, 2).map((t, i) => (
                <TeamCard key={t.id} team={t} delay={i * 0.06} />
              ))}
            </div>
          </motion.div>

          {/* League standings preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                League Standings
              </h2>
              <Link href="/dashboard/leagues" className="text-slate-500 hover:text-red-400 text-xs transition-colors">
                Full table →
              </Link>
            </div>
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden">
              <div className="px-3">
                <StandingsTable standings={mockLeague.standings} highlightTeamId="t1" compact />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Alerts + Top Players */}
        <div className="space-y-6">
          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-900/50 border border-white/5 rounded-2xl p-5"
          >
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              Club Alerts
            </h2>
            <div className="space-y-3">
              {injuredPlayers > 0 && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                  <div className="w-2 h-2 rounded-full bg-red-400 shrink-0 mt-1.5" />
                  <span className="text-sm text-slate-300">
                    {injuredPlayers} player{injuredPlayers > 1 ? 's' : ''} currently injured
                  </span>
                </div>
              )}
              {pendingPlayers > 0 && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 shrink-0 mt-1.5" />
                  <span className="text-sm text-slate-300">
                    {pendingPlayers} registration{pendingPlayers > 1 ? 's' : ''} awaiting approval
                  </span>
                </div>
              )}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                <span className="text-sm text-slate-300">
                  League position: <strong className="text-white">#2</strong> — 8pts behind leaders
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                <span className="text-sm text-slate-300">
                  {activeTeams} teams active this season
                </span>
              </div>
            </div>
          </motion.div>

          {/* Top Players */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" />
                Top Performers
              </h2>
              <Link href="/dashboard/players" className="text-slate-500 hover:text-red-400 text-xs transition-colors">
                All players →
              </Link>
            </div>
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
