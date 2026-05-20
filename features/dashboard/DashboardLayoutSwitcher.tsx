'use client';

import { useCallback, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LayoutGrid, Sparkles, Radar } from 'lucide-react';
import type { Club, Player, Team } from '@/types';
import { cn } from '@/utils';
import { DashboardOverview } from '@/features/dashboard/DashboardOverview';
import { DashboardOverviewBento } from '@/features/dashboard/DashboardOverviewBento';
import { DashboardOverviewCommand } from '@/features/dashboard/DashboardOverviewCommand';

const LAYOUTS = [
  { id: 'classic' as const, label: 'Classic', hint: 'Standard grid', icon: LayoutGrid },
  { id: 'bento' as const, label: 'Bento', hint: 'Glass mosaic', icon: Sparkles },
  { id: 'command' as const, label: 'Command', hint: 'Data rail', icon: Radar },
];

export type DemoLayoutId = (typeof LAYOUTS)[number]['id'];

function isDemoLayout(s: string | null): s is DemoLayoutId {
  return s === 'classic' || s === 'bento' || s === 'command';
}

interface SwitcherInnerProps {
  club: Club;
  players: Player[];
  teams: Team[];
}

function DashboardLayoutSwitcherInner({ club, players, teams }: SwitcherInnerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const raw = searchParams.get('layout');
  const active: DemoLayoutId = isDemoLayout(raw) ? raw : 'classic';

  const setLayout = useCallback(
    (id: DemoLayoutId) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id === 'classic') {
        params.delete('layout');
      } else {
        params.set('layout', id);
      }
      const q = params.toString();
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const shared = { club, players, teams };

  return (
    <div className="space-y-6">
      {/* Layout switcher card */}
      <div className="premium-card rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-1">
              Demo layouts
            </p>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Same data — three different views
            </h2>
            <p className="text-xs text-slate-600 mt-0.5 max-w-md">
              Switch styles to compare structure and visual design. Layout is shared via URL.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {LAYOUTS.map(({ id, label, hint, icon: Icon }) => {
            const selected = active === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setLayout(id)}
                className={cn(
                  'relative flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 overflow-hidden',
                  selected
                    ? 'border-red-500/30 bg-red-500/8 shadow-lg shadow-red-950/20'
                    : 'border-white/5 bg-white/3 hover:border-white/10 hover:bg-white/5'
                )}
              >
                {selected && (
                  <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-red-500/50 to-transparent" />
                )}
                <span className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all',
                  selected
                    ? 'border-red-500/25 bg-red-500/12 text-red-300'
                    : 'border-white/8 bg-white/4 text-slate-500'
                )}>
                  <Icon className="h-4 w-4" suppressHydrationWarning />
                </span>
                <span className="min-w-0">
                  <span className={cn(
                    'block text-sm font-semibold transition-colors',
                    selected ? 'text-white' : 'text-slate-400'
                  )}>
                    {label}
                  </span>
                  <span className="block text-xs text-slate-600 mt-0.5">{hint}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {active === 'classic' && <DashboardOverview {...shared} />}
      {active === 'bento' && <DashboardOverviewBento {...shared} />}
      {active === 'command' && <DashboardOverviewCommand {...shared} />}
    </div>
  );
}

function OverviewFallback() {
  return (
    <div className="min-h-112 rounded-2xl border border-white/5 bg-white/2 animate-pulse" />
  );
}

export function DashboardLayoutSwitcher(props: SwitcherInnerProps) {
  return (
    <Suspense fallback={<OverviewFallback />}>
      <DashboardLayoutSwitcherInner {...props} />
    </Suspense>
  );
}
