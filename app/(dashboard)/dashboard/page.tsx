import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { DashboardOverview } from '@/features/dashboard/DashboardOverview';
import { getClub } from '@/services/club.service';
import { getPlayers } from '@/services/player.service';
import { getTeams } from '@/services/team.service';

export const metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const [club, players, teams] = await Promise.all([
    getClub('1'),
    getPlayers(),
    getTeams('1'),
  ]);

  return (
    <>
      <DashboardHeader title="Dashboard" subtitle={`Welcome back — ${club.name}`} />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <DashboardOverview club={club} players={players} teams={teams} />
      </main>
    </>
  );
}
