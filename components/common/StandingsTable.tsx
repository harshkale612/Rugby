'use client';

import { motion } from 'framer-motion';
import { cn, getFormColor } from '@/utils';
import type { Standing } from '@/types';

interface StandingsTableProps {
  standings: Standing[];
  highlightTeamId?: string;
  compact?: boolean;
}

export function StandingsTable({ standings, highlightTeamId, compact = false }: StandingsTableProps) {
  const displayStandings = compact ? standings.slice(0, 6) : standings;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left py-3 px-3 text-slate-500 font-medium text-xs uppercase tracking-wider w-8">#</th>
            <th className="text-left py-3 px-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Team</th>
            <th className="text-center py-3 px-2 text-slate-500 font-medium text-xs uppercase tracking-wider">P</th>
            <th className="text-center py-3 px-2 text-slate-500 font-medium text-xs uppercase tracking-wider">W</th>
            <th className="text-center py-3 px-2 text-slate-500 font-medium text-xs uppercase tracking-wider">D</th>
            <th className="text-center py-3 px-2 text-slate-500 font-medium text-xs uppercase tracking-wider">L</th>
            {!compact && (
              <>
                <th className="text-center py-3 px-2 text-slate-500 font-medium text-xs uppercase tracking-wider">PF</th>
                <th className="text-center py-3 px-2 text-slate-500 font-medium text-xs uppercase tracking-wider">PA</th>
                <th className="text-center py-3 px-2 text-slate-500 font-medium text-xs uppercase tracking-wider">+/-</th>
                <th className="text-center py-3 px-2 text-slate-500 font-medium text-xs uppercase tracking-wider">BP</th>
                <th className="text-center py-3 px-2 text-slate-500 font-medium text-xs uppercase tracking-wider">Form</th>
              </>
            )}
            <th className="text-center py-3 px-3 text-slate-400 font-bold text-xs uppercase tracking-wider">Pts</th>
          </tr>
        </thead>
        <tbody>
          {displayStandings.map((standing, idx) => {
            const isHighlighted = standing.team.id === highlightTeamId;
            const isPromotion = standing.position <= 2;
            const isRelegation = standing.position >= standings.length - 1;

            return (
              <motion.tr
                key={standing.team.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={cn(
                  'border-b border-white/5 hover:bg-white/3 transition-colors',
                  isHighlighted && 'bg-red-500/5 border-red-500/10'
                )}
              >
                {/* Position */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-1.5">
                    <div className={cn(
                      'w-1 h-6 rounded-full',
                      isPromotion ? 'bg-green-500' : isRelegation ? 'bg-red-500' : 'bg-transparent'
                    )} />
                    <span className={cn(
                      'text-sm font-semibold',
                      isHighlighted ? 'text-red-400' : 'text-slate-400'
                    )}>
                      {standing.position}
                    </span>
                  </div>
                </td>

                {/* Team */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-slate-300">
                        {standing.team.shortName?.slice(0, 2) ?? standing.team.name.slice(0, 2)}
                      </span>
                    </div>
                    <span className={cn(
                      'font-semibold whitespace-nowrap',
                      isHighlighted ? 'text-white' : 'text-slate-300'
                    )}>
                      {compact ? (standing.team.shortName ?? standing.team.name) : standing.team.name}
                    </span>
                    {isHighlighted && (
                      <span className="text-xs text-red-400 font-medium bg-red-400/10 px-1.5 py-0.5 rounded">You</span>
                    )}
                  </div>
                </td>

                {/* Stats */}
                {[standing.played, standing.won, standing.drawn, standing.lost].map((val, i) => (
                  <td key={i} className="py-3.5 px-2 text-center text-slate-400 tabular-nums">{val}</td>
                ))}

                {!compact && (
                  <>
                    <td className="py-3.5 px-2 text-center text-slate-400 tabular-nums">{standing.pointsFor}</td>
                    <td className="py-3.5 px-2 text-center text-slate-400 tabular-nums">{standing.pointsAgainst}</td>
                    <td className={cn(
                      'py-3.5 px-2 text-center font-medium tabular-nums',
                      standing.pointsDiff > 0 ? 'text-green-400' : standing.pointsDiff < 0 ? 'text-red-400' : 'text-slate-400'
                    )}>
                      {standing.pointsDiff > 0 ? '+' : ''}{standing.pointsDiff}
                    </td>
                    <td className="py-3.5 px-2 text-center text-slate-400 tabular-nums">{standing.bonusPoints}</td>

                    {/* Form */}
                    <td className="py-3.5 px-2">
                      <div className="flex items-center justify-center gap-0.5">
                        {standing.form.map((result, ri) => (
                          <span
                            key={ri}
                            className={cn('w-5 h-5 rounded-sm text-white text-xs font-bold flex items-center justify-center', getFormColor(result))}
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </td>
                  </>
                )}

                {/* Points */}
                <td className="py-3.5 px-3 text-center">
                  <span className={cn(
                    'font-black text-base',
                    isHighlighted ? 'text-red-400' : 'text-white'
                  )}>
                    {standing.points}
                  </span>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
