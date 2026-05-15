'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, centered = false, className }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn('mb-12', centered && 'text-center', className)}
    >
      {eyebrow && (
        <div className="flex items-center gap-2 mb-3 text-red-400 text-sm font-semibold tracking-widest uppercase">
          <div className={cn('h-px bg-red-500/50', centered ? 'w-8' : 'hidden')} />
          {eyebrow}
          <div className={cn('h-px bg-red-500/50', centered ? 'w-8' : 'flex-1 max-w-12')} />
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">{title}</h2>
      {subtitle && (
        <p className={cn('text-slate-400 text-lg mt-3 leading-relaxed', centered ? 'max-w-2xl mx-auto' : 'max-w-xl')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
