'use client';

import { motion } from 'framer-motion';
import { Trophy, Shield, Target, Activity, Zap, Clock, TrendingUp } from 'lucide-react';
import type { Player } from '@/types';

interface PlayerStatsDisplayProps {
  player: Player;
}

export function PlayerStatsDisplay({ player }: PlayerStatsDisplayProps) {
  const { stats } = player;

  const keyStats = [
    { label: 'Matches', value: stats.matches, icon: Shield, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Tries', value: stats.tries, icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Tackles', value: stats.tackles, icon: Target, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Carries', value: stats.carries, icon: Activity, color: 'text-red-400', bg: 'bg-red-400/10' },
    { label: 'Metres Gained', value: stats.metersGained, icon: Zap, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Mins Played', value: stats.minutesPlayed, icon: Clock, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Key stats grid */}
      <div>
        <h2 className="text-white font-bold text-2xl mb-6">Season Statistics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {keyStats.map(({ label, value, icon: Icon, color, bg }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 text-center hover:border-white/10 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="text-2xl font-black text-white mb-1">{value}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Attacking Stats
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Tries Scored', value: stats.tries, max: 20 },
              { label: 'Assists', value: stats.assists, max: 20 },
              { label: 'Carries', value: stats.carries, max: 150 },
              { label: 'Metres Gained', value: stats.metersGained, max: 800 },
              ...(stats.conversionRate ? [{ label: 'Conversion Rate', value: stats.conversionRate, max: 100, suffix: '%' }] : []),
            ].map(({ label, value, max, suffix }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">{label}</span>
                  <span className="text-white font-semibold text-sm">{value}{suffix ?? ''}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((value / max) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Defensive Stats
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Tackles Made', value: stats.tackles, max: 150 },
              { label: 'Minutes Played', value: stats.minutesPlayed, max: 1800 },
              { label: 'Yellow Cards', value: stats.yellowCards, max: 5, danger: true },
              { label: 'Red Cards', value: stats.redCards, max: 3, danger: true },
            ].map(({ label, value, max, danger }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">{label}</span>
                  <span className={`font-semibold text-sm ${danger && value > 0 ? 'text-yellow-400' : 'text-white'}`}>{value}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((value / max) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                    className={`h-full rounded-full ${danger ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' : 'bg-gradient-to-r from-blue-600 to-blue-400'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
