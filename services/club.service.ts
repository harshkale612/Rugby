import type { Club } from '@/types';
import { mockClub } from '@/data';

// Replace with apiGet('/clubs/${id}') when backend is ready
export async function getClub(id: string): Promise<Club> {
  await new Promise((r) => setTimeout(r, 100));
  return mockClub;
}

export async function getClubs(): Promise<Club[]> {
  await new Promise((r) => setTimeout(r, 100));
  return [mockClub];
}

export async function updateClub(id: string, data: Partial<Club>): Promise<Club> {
  await new Promise((r) => setTimeout(r, 100));
  return { ...mockClub, ...data };
}
