import type { Team } from '@/types';
import { mockTeams } from '@/data';

export async function getTeams(clubId?: string): Promise<Team[]> {
  await new Promise((r) => setTimeout(r, 100));
  if (clubId) return mockTeams.filter((t) => t.clubId === clubId);
  return mockTeams;
}

export async function getTeam(id: string): Promise<Team | undefined> {
  await new Promise((r) => setTimeout(r, 100));
  return mockTeams.find((t) => t.id === id);
}
