import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { PlayerCard } from '@/components/common/PlayerCard';
import { getPlayers } from '@/services/player.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';

export const metadata = { title: 'Players' };

export default async function PlayersPage() {
  const players = await getPlayers();
  const activeCount = players.filter((p) => p.status === 'active').length;
  const injuredCount = players.filter((p) => p.status === 'injured').length;

  return (
    <>
      <DashboardHeader title="Players" subtitle={`${players.length} players registered`} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="text-slate-400">{activeCount} Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="text-slate-400">{injuredCount} Injured</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                placeholder="Search players..."
                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500 w-full sm:w-64 h-9"
              />
            </div>
            <Button className="bg-red-600 hover:bg-red-500 text-white gap-2 h-9">
              <Plus className="w-4 h-4" />
              Add Player
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {players.map((player, idx) => (
            <PlayerCard key={player.id} player={player} delay={idx * 0.06} />
          ))}
        </div>
      </main>
    </>
  );
}
