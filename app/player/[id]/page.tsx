import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getPlayer } from '@/services/player.service';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getInitials, calculateAge, getStatusColor } from '@/utils';
import { User, Flag, Ruler, Weight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PlayerStatsDisplay } from '@/features/player/PlayerStatsDisplay';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const player = await getPlayer(id);
  return { title: player?.name ?? 'Player Profile' };
}

export default async function PlayerPage({ params }: Props) {
  const { id } = await params;
  const player = await getPlayer(id);
  if (!player) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative pt-20 pb-0 bg-gradient-to-br from-slate-950 via-red-950/20 to-slate-900 min-h-72">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-red-600/8 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/dashboard/players" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors w-fit">
              <ArrowLeft className="w-4 h-4" />
              Back to Players
            </Link>

            <div className="flex flex-col sm:flex-row items-start gap-8">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <Avatar className="w-28 h-28 border-4 border-white/10 shadow-2xl">
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback className="bg-red-600/20 text-red-300 font-black text-3xl">
                    {getInitials(player.name)}
                  </AvatarFallback>
                </Avatar>
                {player.jerseyNumber && (
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-red-600 text-white font-black text-lg flex items-center justify-center border-4 border-slate-950">
                    {player.jerseyNumber}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-4xl font-black text-white">{player.name}</h1>
                  <Badge className={`text-xs capitalize border ${getStatusColor(player.status)}`}>
                    {player.status}
                  </Badge>
                </div>
                <p className="text-red-400 font-semibold text-lg mb-3">{player.position}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5"><Flag className="w-4 h-4" />{player.nationality}</span>
                  {player.dateOfBirth && (
                    <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{calculateAge(player.dateOfBirth)} years old</span>
                  )}
                  {player.height && (
                    <span className="flex items-center gap-1.5"><Ruler className="w-4 h-4" />{player.height}cm</span>
                  )}
                  {player.weight && (
                    <span className="flex items-center gap-1.5"><Weight className="w-4 h-4" />{player.weight}kg</span>
                  )}
                </div>
                {player.bio && (
                  <p className="text-slate-400 mt-4 max-w-2xl leading-relaxed">{player.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PlayerStatsDisplay player={player} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
