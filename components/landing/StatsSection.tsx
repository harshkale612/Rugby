'use client';

import { motion } from 'framer-motion';
import { PLATFORM_STATS } from '@/constants';

export function StatsSection() {
  return (
    <section className="py-16 bg-slate-900/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {PLATFORM_STATS.map(({ label, value, description }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-black text-white mb-2">{value}</div>
              <div className="text-red-400 font-semibold text-sm mb-1">{label}</div>
              <div className="text-slate-500 text-xs">{description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
