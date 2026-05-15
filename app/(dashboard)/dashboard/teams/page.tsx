import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { TeamCard } from '@/components/common/TeamCard';
import { getTeams } from '@/services/team.service';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const metadata = { title: 'Teams' };

export default async function TeamsPage() {
  const teams = await getTeams('1');

  return (
    <>
      <DashboardHeader title="Teams" subtitle={`${teams.length} teams managed`} />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-white font-semibold text-lg">All Teams</h2>
            <p className="text-slate-500 text-sm">Manage your club's squads and age groups</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-500 text-white gap-2">
            <Plus className="w-4 h-4" />
            Add Team
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {teams.map((team, idx) => (
            <TeamCard key={team.id} team={team} delay={idx * 0.08} />
          ))}
        </div>
      </main>
    </>
  );
}
