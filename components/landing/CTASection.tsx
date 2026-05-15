'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  'Free forever for clubs under 50 players',
  'No credit card required',
  'Setup in under 5 minutes',
  'All four modules included',
];

export function CTASection() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-red-600/5 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
            Join 250+ Rugby Clubs
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Ready to Transform
            <br />
            <span className="text-red-400">Your Club?</span>
          </h2>

          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Get all four modules — Club, Teams, Players, and Leagues — in one platform.
            Start for free, upgrade when you grow.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-10">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" suppressHydrationWarning />
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-500 text-white px-10 py-4 text-base font-semibold shadow-2xl shadow-red-900/40 group h-auto"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" suppressHydrationWarning />
              </Button>
            </Link>
            <Link href="/club/1">
              <Button
                variant="outline"
                size="lg"
                className="border-white/10 text-slate-300 hover:text-white hover:bg-white/5 px-8 py-4 text-base h-auto"
              >
                View Demo Club
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
