import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { DashboardLayoutSwitcher } from '@/features/dashboard/DashboardLayoutSwitcher';
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
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <DashboardLayoutSwitcher club={club} players={players} teams={teams} />
      </main>
    </>
  );
}
