import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StandingsTable } from '@/components/common/StandingsTable';
import { SectionHeader } from '@/components/common/SectionHeader';
import { mockLeague } from '@/data';
import { Trophy, Calendar, Users, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils';

export const metadata = { title: 'Leagues & Standings' };

export default function LeaguesPage() {
  const league = mockLeague;

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#060A14' }}>
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeader
            eyebrow="League Table"
            title={league.name}
            subtitle={`Season ${league.season} — Track every team's performance across the season.`}
          />

          {/* League info strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Users, label: 'Teams', value: `${league.teams.length} clubs` },
              { icon: Calendar, label: 'Season', value: `${formatDate(league.startDate)} – ${formatDate(league.endDate)}` },
              { icon: Target, label: 'Format', value: 'Round Robin' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="premium-card rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-slate-400" suppressHydrationWarning />
                </div>
                <div>
                  <div className="text-slate-600 text-xs uppercase tracking-wider">{label}</div>
                  <div className="text-white font-semibold text-sm mt-0.5">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Standings card */}
          <div className="premium-card rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-amber-400" suppressHydrationWarning />
                </div>
                <h3 className="text-white font-bold">Full Standings Table</h3>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs ml-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5 inline-block" />
                Live
              </Badge>
              <div className="flex items-center gap-5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <div className="w-0.5 h-4 rounded-full bg-emerald-500" />
                  Promotion
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-0.5 h-4 rounded-full bg-red-500" />
                  Relegation
                </div>
              </div>
            </div>
            <div className="px-2 py-1">
              <StandingsTable standings={league.standings} highlightTeamId="t1" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
