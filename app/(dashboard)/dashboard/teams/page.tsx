import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { TeamCard } from '@/components/common/TeamCard';
import { getTeams } from '@/services/team.service';
import { Button } from '@/components/ui/button';
import { Plus, Users, TrendingUp, Shield } from 'lucide-react';

export const metadata = { title: 'Teams' };

export default async function TeamsPage() {
  const teams = await getTeams('1');

  const activeCount = teams.filter((t) => t.stats.played > 0).length;
  const avgWinRate = teams.length
    ? Math.round(teams.reduce((acc, t) => acc + (t.stats.played > 0 ? (t.stats.won / t.stats.played) * 100 : 0), 0) / teams.length)
    : 0;

  return (
    <>
      <DashboardHeader
        title="Teams"
        subtitle={`${teams.length} teams managed`}
        actions={
          <Button className="bg-red-600 hover:bg-red-500 text-white h-9 px-4 text-sm gap-2 shadow-lg shadow-red-950/40 font-semibold">
            <Plus className="w-3.5 h-3.5" suppressHydrationWarning />
            Add Team
          </Button>
        }
      />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">

        {/* Summary strip */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Shield, label: 'Total Teams', value: teams.length, color: 'text-slate-400', bg: 'bg-white/4' },
            { icon: Users, label: 'Active This Season', value: activeCount, color: 'text-blue-400', bg: 'bg-blue-500/8' },
            { icon: TrendingUp, label: 'Avg Win Rate', value: `${avgWinRate}%`, color: 'text-emerald-400', bg: 'bg-emerald-500/8' },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="premium-card rounded-xl p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg ${bg} border border-white/6 flex items-center justify-center shrink-0`}>
                <Icon className={`w-4 h-4 ${color}`} suppressHydrationWarning />
              </div>
              <div>
                <p className="text-slate-600 text-xs">{label}</p>
                <p className="text-white font-bold text-lg tabular leading-tight">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold">All Squads</h2>
            <p className="text-slate-600 text-sm mt-0.5">Manage your club's teams and age groups</p>
          </div>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {teams.map((team, idx) => (
            <TeamCard key={team.id} team={team} delay={idx * 0.06} />
          ))}
        </div>
      </main>
    </>
  );
}
