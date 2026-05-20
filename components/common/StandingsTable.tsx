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
            <th className="text-left py-3 px-3 text-slate-600 font-semibold text-[10px] uppercase tracking-widest w-10">#</th>
            <th className="text-left py-3 px-3 text-slate-600 font-semibold text-[10px] uppercase tracking-widest">Team</th>
            <th className="text-center py-3 px-2 text-slate-600 font-semibold text-[10px] uppercase tracking-widest">P</th>
            <th className="text-center py-3 px-2 text-slate-600 font-semibold text-[10px] uppercase tracking-widest">W</th>
            <th className="text-center py-3 px-2 text-slate-600 font-semibold text-[10px] uppercase tracking-widest">D</th>
            <th className="text-center py-3 px-2 text-slate-600 font-semibold text-[10px] uppercase tracking-widest">L</th>
            {!compact && (
              <>
                <th className="text-center py-3 px-2 text-slate-600 font-semibold text-[10px] uppercase tracking-widest">PF</th>
                <th className="text-center py-3 px-2 text-slate-600 font-semibold text-[10px] uppercase tracking-widest">PA</th>
                <th className="text-center py-3 px-2 text-slate-600 font-semibold text-[10px] uppercase tracking-widest">+/-</th>
                <th className="text-center py-3 px-2 text-slate-600 font-semibold text-[10px] uppercase tracking-widest">BP</th>
                <th className="text-center py-3 px-2 text-slate-600 font-semibold text-[10px] uppercase tracking-widest">Form</th>
              </>
            )}
            <th className="text-center py-3 px-3 text-slate-400 font-bold text-[10px] uppercase tracking-widest">Pts</th>
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
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className={cn(
                  'border-b border-white/3 transition-colors duration-150 group',
                  isHighlighted
                    ? 'bg-red-500/5 hover:bg-red-500/8'
                    : 'hover:bg-white/3'
                )}
              >
                {/* Position */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      'w-0.5 h-5 rounded-full shrink-0',
                      isPromotion ? 'bg-emerald-500' : isRelegation ? 'bg-red-500' : 'bg-transparent'
                    )} />
                    <span className={cn(
                      'text-sm font-bold tabular',
                      isHighlighted ? 'text-red-400' : 'text-slate-500'
                    )}>
                      {standing.position}
                    </span>
                  </div>
                </td>

                {/* Team */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-slate-300">
                        {standing.team.shortName?.slice(0, 2) ?? standing.team.name.slice(0, 2)}
                      </span>
                    </div>
                    <span className={cn(
                      'font-semibold whitespace-nowrap text-sm',
                      isHighlighted ? 'text-white' : 'text-slate-300'
                    )}>
                      {compact ? (standing.team.shortName ?? standing.team.name) : standing.team.name}
                    </span>
                    {isHighlighted && (
                      <span className="text-[10px] text-red-400 font-bold bg-red-400/10 px-1.5 py-0.5 rounded-full border border-red-400/20">
                        You
                      </span>
                    )}
                  </div>
                </td>

                {/* Core stats */}
                {[standing.played, standing.won, standing.drawn, standing.lost].map((val, i) => (
                  <td key={i} className="py-3.5 px-2 text-center text-slate-500 tabular text-sm">{val}</td>
                ))}

                {!compact && (
                  <>
                    <td className="py-3.5 px-2 text-center text-slate-500 tabular text-sm">{standing.pointsFor}</td>
                    <td className="py-3.5 px-2 text-center text-slate-500 tabular text-sm">{standing.pointsAgainst}</td>
                    <td className={cn(
                      'py-3.5 px-2 text-center font-semibold tabular text-sm',
                      standing.pointsDiff > 0 ? 'text-emerald-400' : standing.pointsDiff < 0 ? 'text-red-400' : 'text-slate-500'
                    )}>
                      {standing.pointsDiff > 0 ? '+' : ''}{standing.pointsDiff}
                    </td>
                    <td className="py-3.5 px-2 text-center text-slate-500 tabular text-sm">{standing.bonusPoints}</td>
                    <td className="py-3.5 px-2">
                      <div className="flex items-center justify-center gap-0.5">
                        {standing.form.map((result, ri) => (
                          <span
                            key={ri}
                            className={cn(
                              'w-5 h-5 rounded text-white text-[10px] font-bold flex items-center justify-center',
                              getFormColor(result)
                            )}
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
                    'font-black text-base tabular',
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
