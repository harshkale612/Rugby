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
  { id: 'classic' as const, label: 'Classic', hint: 'Split grid', icon: LayoutGrid },
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
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Demo dashboards
            </p>
            <h2 className="text-lg sm:text-xl font-semibold text-white mt-1">
              Same data — three layouts
            </h2>
            <p className="text-sm text-slate-500 mt-0.5 max-w-xl">
              Switch styles to compare structure and visual design. Links stay shareable via the URL.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {LAYOUTS.map(({ id, label, hint, icon: Icon }) => {
            const selected = active === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setLayout(id)}
                className={cn(
                  'flex items-start gap-3 rounded-xl border px-3 py-3 sm:px-4 sm:py-3.5 text-left transition-all',
                  selected
                    ? 'border-red-500/40 bg-red-500/10 shadow-lg shadow-red-950/30 ring-1 ring-red-500/20'
                    : 'border-white/5 bg-slate-950/40 hover:border-white/15 hover:bg-slate-900/60'
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border',
                    selected
                      ? 'border-red-400/30 bg-red-500/15 text-red-300'
                      : 'border-white/10 bg-white/5 text-slate-400'
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white">{label}</span>
                  <span className="block text-xs text-slate-500 mt-0.5">{hint}</span>
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
    <div className="min-h-[28rem] rounded-2xl border border-white/5 bg-slate-900/30 animate-pulse" />
  );
}

export function DashboardLayoutSwitcher(props: SwitcherInnerProps) {
  return (
    <Suspense fallback={<OverviewFallback />}>
      <DashboardLayoutSwitcherInner {...props} />
    </Suspense>
  );
}
