'use client';

import { Bell, Menu, Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from './SidebarContext';
import { cn } from '@/utils';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function DashboardHeader({ title, subtitle, actions }: DashboardHeaderProps) {
  const { setMobileOpen } = useSidebar();

  return (
    <header className="shrink-0 border-b border-white/5 bg-slate-950/60 backdrop-blur-sm">
      {/* Main header row */}
      <div className="flex items-center gap-3 px-4 sm:px-6 h-16">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 -ml-1 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" suppressHydrationWarning />
        </button>

        {/* Title block */}
        <div className="flex-1 min-w-0">
          {subtitle && (
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-slate-600 text-xs truncate">{subtitle}</span>
            </div>
          )}
          <h1 className="text-white font-bold text-lg leading-tight truncate tracking-tight">
            {title}
          </h1>
        </div>

        {/* Right area */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Search shortcut — desktop only */}
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/4 border border-white/6 text-slate-500 hover:text-slate-300 hover:bg-white/6 hover:border-white/10 transition-all duration-200 text-sm">
            <Search className="w-3.5 h-3.5" suppressHydrationWarning />
            <span className="text-xs hidden md:block">Search</span>
            <kbd className="text-[10px] bg-white/8 px-1.5 py-0.5 rounded font-mono hidden md:block">⌘K</kbd>
          </button>

          {/* Page-level actions slot */}
          {actions && <div className="flex items-center gap-2">{actions}</div>}

          {/* Notification bell */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-500 hover:text-white hover:bg-white/5 w-9 h-9"
          >
            <Bell className="w-4.5 h-4.5" suppressHydrationWarning />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500 ring-2 ring-slate-950" />
          </Button>

          {/* Avatar */}
          <div className="relative cursor-pointer">
            <Avatar className="w-8 h-8 ring-2 ring-white/8 hover:ring-white/20 transition-all duration-200">
              <AvatarImage src="/avatars/admin.jpg" />
              <AvatarFallback className="bg-red-600 text-white text-xs font-bold">GA</AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
          </div>
        </div>
      </div>
    </header>
  );
}
