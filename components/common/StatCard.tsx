'use client';

import { motion } from 'framer-motion';
import {
  Users, Shield, Trophy, TrendingUp, TrendingDown, Calendar, Activity,
  BarChart3, Target, Clock, Star, Zap, Globe,
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

const variantConfig = {
  default: {
    card: 'bg-linear-to-br from-slate-800/60 to-slate-900/60 border-white/6 hover:border-white/12',
    iconWrap: 'bg-white/6 border-white/8 text-slate-300',
    value: 'text-white',
    title: 'text-slate-400',
  },
  glass: {
    card: 'bg-white/4 backdrop-blur-xl border-white/8 hover:border-white/14 hover:bg-white/6',
    iconWrap: 'bg-white/8 border-white/10 text-white',
    value: 'text-white',
    title: 'text-slate-400',
  },
  gradient: {
    card: 'bg-linear-to-br from-red-950/60 via-red-950/25 to-slate-900/60 border-red-500/20 hover:border-red-500/35',
    iconWrap: 'bg-red-500/15 border-red-500/25 text-red-400',
    value: 'text-white',
    title: 'text-red-300/80',
  },
};

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
  const cfg = variantConfig[variant];
  const trendUp = trend && trend.value >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        'relative rounded-2xl p-5 sm:p-6 border overflow-hidden transition-all duration-200',
        cfg.card,
        className
      )}
    >
      {/* Subtle corner glow */}
      {variant === 'gradient' && (
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-red-500/8 -translate-y-8 translate-x-8 blur-xl pointer-events-none" />
      )}

      {/* Top accent bar */}
      <div className={cn(
        'absolute top-0 left-0 right-0 h-0.5 opacity-50',
        variant === 'gradient'
          ? 'bg-linear-to-r from-red-600 via-red-500 to-transparent'
          : 'bg-linear-to-r from-white/10 via-white/5 to-transparent'
      )} />

      <div className="relative">
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <div className={cn(
            'w-11 h-11 rounded-xl border flex items-center justify-center shrink-0',
            cfg.iconWrap
          )}>
            <Icon className="w-5 h-5" suppressHydrationWarning />
          </div>

          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full',
              trendUp
                ? 'text-emerald-400 bg-emerald-400/10'
                : 'text-red-400 bg-red-400/10'
            )}>
              {trendUp
                ? <TrendingUp className="w-3 h-3" suppressHydrationWarning />
                : <TrendingDown className="w-3 h-3" suppressHydrationWarning />
              }
              {trendUp ? '+' : ''}{trend.value}%
            </div>
          )}
        </div>

        {/* Value */}
        <div className={cn('text-3xl sm:text-4xl font-black tracking-tight mb-1 tabular', cfg.value)}>
          {value}
        </div>

        {/* Title */}
        <div className={cn('text-sm font-medium', cfg.title)}>{title}</div>

        {/* Subtitle or trend label */}
        {(subtitle || trend?.label) && (
          <div className="text-xs text-slate-600 mt-1">
            {subtitle ?? `vs ${trend!.label}`}
          </div>
        )}
      </div>
    </motion.div>
  );
}
