import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { StandingsTable } from '@/components/common/StandingsTable';
import { mockLeague } from '@/data';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, Users, Target } from 'lucide-react';
import { formatDate } from '@/utils';

export const metadata = { title: 'Leagues' };

export default function LeaguesPage() {
  const league = mockLeague;

  const topTeam = league.standings[0];
  const ourTeam = league.standings.find((s) => s.team.id === 't1');

  return (
    <>
      <DashboardHeader
        title="Leagues"
        subtitle="Standings and competition overview"
      />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">

        {/* League hero card */}
        <div className="relative premium-card rounded-2xl p-6 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-amber-600/40 via-amber-500/20 to-transparent" />
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-500/4 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Trophy className="w-7 h-7 text-amber-400" suppressHydrationWarning />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-white font-bold text-xl">{league.name}</h2>
                <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5 inline-block" />
                  Active
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" suppressHydrationWarning />
                  {league.teams.length} Teams
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" suppressHydrationWarning />
                  {formatDate(league.startDate)} – {formatDate(league.endDate)}
                </span>
                <span className="text-slate-600">Season {league.season}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'League Leader', value: topTeam?.team.shortName ?? '—', sub: `${topTeam?.points ?? 0} pts`, color: 'text-amber-400' },
            { label: 'Your Position', value: ourTeam ? `#${ourTeam.position}` : '—', sub: `${ourTeam?.points ?? 0} pts`, color: 'text-red-400' },
            { label: 'Games Played', value: ourTeam?.played ?? 0, sub: 'this season', color: 'text-blue-400' },
            { label: 'Gap to Top', value: ourTeam && topTeam ? `${topTeam.points - ourTeam.points}` : '—', sub: 'points behind', color: 'text-slate-400' },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="premium-card rounded-xl p-4">
              <p className="text-slate-600 text-xs mb-2">{label}</p>
              <p className={`text-2xl font-black tabular ${color}`}>{value}</p>
              <p className="text-slate-700 text-xs mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Standings table */}
        <div className="premium-card rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2.5">
              <Target className="w-4 h-4 text-slate-500" suppressHydrationWarning />
              <h3 className="text-white font-bold">League Standings</h3>
            </div>
            <div className="flex items-center gap-5 ml-auto text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <div className="w-0.5 h-4 rounded-full bg-emerald-500" />
                <span>Promotion Zone</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-0.5 h-4 rounded-full bg-red-500" />
                <span>Relegation Zone</span>
              </div>
            </div>
          </div>
          <div className="px-2 py-1">
            <StandingsTable standings={league.standings} highlightTeamId="t1" />
          </div>
        </div>
      </main>
    </>
  );
}
