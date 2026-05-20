import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { PlayerCard } from '@/components/common/PlayerCard';
import { getPlayers } from '@/services/player.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Users, Activity, AlertCircle } from 'lucide-react';

export const metadata = { title: 'Players' };

export default async function PlayersPage() {
  const players = await getPlayers();
  const activeCount = players.filter((p) => p.status === 'active').length;
  const injuredCount = players.filter((p) => p.status === 'injured').length;
  const suspendedCount = players.filter((p) => p.status === 'suspended').length;

  return (
    <>
      <DashboardHeader
        title="Players"
        subtitle={`${players.length} players registered`}
        actions={
          <Button className="bg-red-600 hover:bg-red-500 text-white h-9 px-4 text-sm gap-2 shadow-lg shadow-red-950/40 font-semibold">
            <Plus className="w-3.5 h-3.5" suppressHydrationWarning />
            Add Player
          </Button>
        }
      />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">

        {/* Status summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Users, label: 'Active', value: activeCount, color: 'text-emerald-400', bg: 'bg-emerald-500/8', dot: 'bg-emerald-400' },
            { icon: AlertCircle, label: 'Injured', value: injuredCount, color: 'text-red-400', bg: 'bg-red-500/8', dot: 'bg-red-400' },
            { icon: Activity, label: 'Suspended', value: suspendedCount, color: 'text-amber-400', bg: 'bg-amber-500/8', dot: 'bg-amber-400' },
          ].map(({ icon: Icon, label, value, color, bg, dot }) => (
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

        {/* Search bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" suppressHydrationWarning />
            <Input
              placeholder="Search players by name or position..."
              className="pl-9 bg-white/4 border-white/8 text-white placeholder:text-slate-600 h-9 focus:border-red-500/40 focus:bg-white/6 transition-all"
            />
          </div>
        </div>

        {/* Player grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {players.map((player, idx) => (
            <PlayerCard key={player.id} player={player} delay={idx * 0.04} />
          ))}
        </div>
      </main>
    </>
  );
}
