import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { StandingsTable } from '@/components/common/StandingsTable';
import { mockLeague } from '@/data';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, Users } from 'lucide-react';
import { formatDate } from '@/utils';

export const metadata = { title: 'Leagues' };

export default function LeaguesPage() {
  const league = mockLeague;

  return (
    <>
      <DashboardHeader title="Leagues" subtitle="League standings and competition overview" />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* League header card */}
        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-7 h-7 text-yellow-400" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-white font-bold text-xl">{league.name}</h2>
                <Badge className="bg-green-500/15 text-green-400 border border-green-500/20 text-xs">
                  Active
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {league.teams.length} Teams
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(league.startDate)} – {formatDate(league.endDate)}
                </span>
                <span>Season {league.season}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Standings */}
        <div className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
            <h3 className="text-white font-semibold">League Standings</h3>
            <div className="flex items-center gap-4 ml-auto text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Promotion Zone</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span>Relegation Zone</span>
              </div>
            </div>
          </div>
          <div className="px-3">
            <StandingsTable standings={league.standings} highlightTeamId="t1" />
          </div>
        </div>
      </main>
    </>
  );
}
