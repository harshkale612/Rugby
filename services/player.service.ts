import type { Player } from '@/types';
import { mockPlayers } from '@/data';

export async function getPlayers(teamId?: string): Promise<Player[]> {
  await new Promise((r) => setTimeout(r, 100));
  if (teamId) return mockPlayers.filter((p) => p.teamId === teamId);
  return mockPlayers;
}

export async function getPlayer(id: string): Promise<Player | undefined> {
  await new Promise((r) => setTimeout(r, 100));
  return mockPlayers.find((p) => p.id === id);
}
