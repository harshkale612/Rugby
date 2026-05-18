import type { Club, Player, Team } from '@/types';

export interface OverviewContentProps {
  club: Club;
  players: Player[];
  teams: Team[];
}

export function getOverviewMetrics({ club, players, teams }: OverviewContentProps) {
  const activeTeams = teams.filter((t) => t.status === 'active').length;
  const injuredPlayers = players.filter((p) => p.status === 'injured').length;
  const pendingPlayers = players.filter((p) => p.registrationStatus === 'pending').length;
  const topPlayers = players
    .filter((p) => p.status === 'active')
    .sort((a, b) => b.stats.tries - a.stats.tries)
    .slice(0, 3);
  const teamPreview = teams.slice(0, 2);

  return {
    activeTeams,
    injuredPlayers,
    pendingPlayers,
    topPlayers,
    teamPreview,
  };
}
