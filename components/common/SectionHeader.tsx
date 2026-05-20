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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn('mb-12', centered && 'text-center', className)}
    >
      {eyebrow && (
        <div className={cn(
          'inline-flex items-center gap-2.5 mb-4',
          centered ? 'justify-center w-full' : ''
        )}>
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-400">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className={cn(
        'text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.05] tracking-tight',
        centered && 'mx-auto'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'text-slate-400 text-lg mt-4 leading-relaxed',
          centered ? 'max-w-2xl mx-auto' : 'max-w-xl'
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
