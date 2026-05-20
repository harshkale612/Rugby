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

const statusConfig: Record<string, { label: string; dot: string; badge: string }> = {
  active:    { label: 'Active',    dot: 'bg-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  injured:   { label: 'Injured',   dot: 'bg-red-400',     badge: 'bg-red-500/10 text-red-400 border-red-500/20' },
  suspended: { label: 'Suspended', dot: 'bg-amber-400',   badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  inactive:  { label: 'Inactive',  dot: 'bg-slate-500',   badge: 'bg-slate-700/30 text-slate-400 border-slate-600/20' },
};

export function PlayerCard({ player, delay = 0, compact = false }: PlayerCardProps) {
  const status = statusConfig[player.status] ?? statusConfig.inactive;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group"
    >
      <Link href={`/player/${player.id}`}>
        <div className="premium-card rounded-2xl overflow-hidden">
          {/* Position accent bar */}
          <div className="h-0.5 bg-linear-to-r from-red-600 via-red-500 to-transparent" />

          <div className={cn('p-5', compact && 'p-4')}>
            <div className="flex items-start gap-4">
              {/* Avatar + jersey */}
              <div className="relative shrink-0">
                <Avatar className={cn(
                  'ring-2 ring-white/8 group-hover:ring-white/16 transition-all duration-300',
                  compact ? 'w-11 h-11' : 'w-14 h-14'
                )}>
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback className="bg-slate-800 text-slate-200 font-bold text-base">
                    {getInitials(player.name)}
                  </AvatarFallback>
                </Avatar>
                {player.jerseyNumber && (
                  <span className="absolute -bottom-1 -right-1 min-w-5.5 h-5.5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-slate-900 px-0.5">
                    {player.jerseyNumber}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-white font-semibold truncate group-hover:text-red-200 transition-colors duration-200 text-sm">
                    {player.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className={cn('text-[10px] border shrink-0 capitalize px-1.5 py-0.5', status.badge)}
                  >
                    <span className={cn('w-1 h-1 rounded-full mr-1 inline-block', status.dot)} />
                    {status.label}
                  </Badge>
                </div>

                <p className="text-red-400 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  {player.position}
                </p>

                <div className="flex items-center gap-2.5 text-xs text-slate-600">
                  <span>{player.nationality}</span>
                  {player.dateOfBirth && (
                    <>
                      <span className="text-slate-700">·</span>
                      <span>{calculateAge(player.dateOfBirth)} yrs</span>
                    </>
                  )}
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
                  <div key={label} className="text-center bg-white/3 rounded-xl py-2.5">
                    <div className="text-lg font-black text-white tabular">{value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-600 mt-0.5">{label}</div>
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
