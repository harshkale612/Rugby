import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StandingsTable } from '@/components/common/StandingsTable';
import { SectionHeader } from '@/components/common/SectionHeader';
import { mockLeague } from '@/data';
import { Trophy, Calendar, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils';

export const metadata = { title: 'Leagues & Standings' };

export default function LeaguesPage() {
  const league = mockLeague;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="League Table"
            title={league.name}
            subtitle={`Season ${league.season} — Track every team's performance across the season.`}
          />

          {/* League info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Users, label: 'Teams', value: `${league.teams.length} clubs` },
              { icon: Calendar, label: 'Season', value: `${formatDate(league.startDate)} – ${formatDate(league.endDate)}` },
              { icon: Trophy, label: 'Format', value: 'Round Robin' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <div className="text-slate-500 text-xs">{label}</div>
                  <div className="text-white font-semibold text-sm">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Standings */}
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex flex-wrap items-center gap-4">
              <h3 className="text-white font-semibold">Full Standings Table</h3>
              <Badge className="bg-green-500/15 text-green-400 border border-green-500/20 text-xs ml-auto">Live</Badge>
              <div className="flex items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />Promotion
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500" />Relegation
                </div>
              </div>
            </div>
            <div className="px-3">
              <StandingsTable standings={league.standings} highlightTeamId="t1" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
