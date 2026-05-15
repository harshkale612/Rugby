'use client';

import { motion } from 'framer-motion';
import {
  Users, Shield, Trophy, TrendingUp, Calendar, Activity,
  BarChart3, Target, Clock, Star, Zap, Globe
} from 'lucide-react';
import { cn } from '@/utils';

const ICON_MAP = {
  Users, Shield, Trophy, TrendingUp, Calendar, Activity,
  BarChart3, Target, Clock, Star, Zap, Globe,
} as const;

export type StatIconName = keyof typeof ICON_MAP;

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: StatIconName;
  trend?: { value: number; label: string };
  variant?: 'default' | 'glass' | 'gradient';
  className?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
  className,
  delay = 0,
}: StatCardProps) {
  const Icon = ICON_MAP[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2 }}
      className={cn(
        'rounded-2xl p-4 sm:p-6 relative overflow-hidden',
        variant === 'glass' && 'bg-white/5 backdrop-blur-sm border border-white/10',
        variant === 'default' && 'bg-slate-800/50 border border-white/5',
        variant === 'gradient' && 'bg-gradient-to-br from-red-600/20 to-red-900/10 border border-red-500/20',
        className
      )}
    >
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/2 -translate-y-8 translate-x-8" />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            'w-11 h-11 rounded-xl flex items-center justify-center',
            variant === 'gradient' ? 'bg-red-500/20' : 'bg-white/5'
          )}>
            <Icon className={cn('w-5 h-5', variant === 'gradient' ? 'text-red-400' : 'text-slate-300')} />
          </div>

          {trend && (
            <span className={cn(
              'text-xs font-medium px-2 py-1 rounded-full',
              trend.value >= 0 ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'
            )}>
              {trend.value >= 0 ? '+' : ''}{trend.value}% {trend.label}
            </span>
          )}
        </div>

        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm font-medium text-slate-400">{title}</div>
        {subtitle && <div className="text-xs text-slate-500 mt-1">{subtitle}</div>}
      </div>
    </motion.div>
  );
}
