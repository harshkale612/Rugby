import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getTeam } from '@/services/team.service';
import { getPlayers } from '@/services/player.service';
import { PlayerCard } from '@/components/common/PlayerCard';
import { notFound } from 'next/navigation';
import { Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { StatCard } from '@/components/common/StatCard';
import { TEAM_CATEGORIES } from '@/constants';

interface Props {
  params: Promise<{ id: string }>;
}

const categoryLabels = Object.fromEntries(TEAM_CATEGORIES.map((c) => [c.value, c.label]));

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const team = await getTeam(id);
  return { title: team?.name ?? 'Team' };
}

export default async function TeamPage({ params }: Props) {
  const { id } = await params;
  const team = await getTeam(id);
  if (!team) notFound();

  const players = await getPlayers(id);
  const winRate = team.stats.played > 0
    ? Math.round((team.stats.won / team.stats.played) * 100)
    : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="relative pt-24 pb-12 bg-gradient-to-br from-slate-950 via-red-950/20 to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600/20 to-red-900/20 border border-red-500/20 flex items-center justify-center">
                <Users className="w-10 h-10 text-red-400" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl font-black text-white">{team.name}</h1>
                  <Badge className="bg-red-500/15 text-red-400 border border-red-500/20">
                    {categoryLabels[team.category] ?? team.category}
                  </Badge>
                </div>
                {team.headCoach && (
                  <p className="text-slate-400">Head Coach: <span className="text-white font-medium">{team.headCoach.name}</span></p>
                )}
                {team.description && (
                  <p className="text-slate-400 mt-2 max-w-xl">{team.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Season stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Matches Played" value={team.stats.played} icon="Shield" delay={0} />
            <StatCard title="Won" value={team.stats.won} icon="Trophy" delay={0.1} />
            <StatCard title="Win Rate" value={`${winRate}%`} icon="TrendingUp" variant="gradient" delay={0.2} />
            <StatCard title="Points Scored" value={team.stats.pointsFor} icon="Users" delay={0.3} />
          </div>

          {/* Squad */}
          <div>
            <SectionHeader
              eyebrow="Squad"
              title="Player Roster"
              subtitle={`${players.length} players registered for the ${team.season} season.`}
            />
            {players.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {players.map((player, idx) => (
                  <PlayerCard key={player.id} player={player} delay={idx * 0.06} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p>No players registered for this team yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
