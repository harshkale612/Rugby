'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Player } from '@/types';
import { cn, getInitials, calculateAge } from '@/utils';

interface PlayerCardProps {
  player: Player;
  delay?: number;
  compact?: boolean;
}

const statusColors: Record<string, string> = {
  active: 'bg-green-500/15 text-green-400 border-green-500/20',
  injured: 'bg-red-500/15 text-red-400 border-red-500/20',
  suspended: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  inactive: 'bg-slate-700/50 text-slate-400 border-slate-600/20',
};

export function PlayerCard({ player, delay = 0, compact = false }: PlayerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group"
    >
      <Link href={`/player/${player.id}`}>
        <div className="bg-slate-800/40 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 hover:bg-slate-800/60 transition-all duration-300">
          {/* Jersey number band */}
          <div className="relative h-2 bg-gradient-to-r from-red-700 to-red-500" />

          <div className={cn('p-5', compact && 'p-4')}>
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <Avatar className={cn('border-2 border-white/10', compact ? 'w-12 h-12' : 'w-16 h-16')}>
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback className="bg-red-600/20 text-red-300 font-bold text-lg">
                    {getInitials(player.name)}
                  </AvatarFallback>
                </Avatar>
                {player.jerseyNumber && (
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center border-2 border-slate-800">
                    {player.jerseyNumber}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-white font-semibold truncate group-hover:text-red-300 transition-colors">
                    {player.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className={cn('text-xs border flex-shrink-0 capitalize', statusColors[player.status])}
                  >
                    {player.status}
                  </Badge>
                </div>
                <p className="text-red-400 text-sm font-medium mb-1">{player.position}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{player.nationality}</span>
                  {player.dateOfBirth && <><span>·</span><span>{calculateAge(player.dateOfBirth)} yrs</span></>}
                </div>
              </div>
            </div>

            {/* Stats row */}
            {!compact && (
              <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-3">
                {[
                  { label: 'Apps', value: player.stats.matches },
                  { label: 'Tries', value: player.stats.tries },
                  { label: 'Tackles', value: player.stats.tackles },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <div className="text-lg font-bold text-white">{value}</div>
                    <div className="text-xs text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
