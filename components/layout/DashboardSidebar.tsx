'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Shield, Users, User, Trophy,
  ChevronLeft, ChevronRight, LogOut, Search, X,
  Settings, HelpCircle,
} from 'lucide-react';
import { cn } from '@/utils';
import { APP_NAME } from '@/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from './SidebarContext';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/club', label: 'Club', icon: Shield, exact: false },
  { href: '/dashboard/teams', label: 'Teams', icon: Users, exact: false },
  { href: '/dashboard/players', label: 'Players', icon: User, exact: false },
  { href: '/dashboard/leagues', label: 'Leagues', icon: Trophy, exact: false },
];

const bottomItems = [
  { href: '#', label: 'Settings', icon: Settings },
  { href: '#', label: 'Help & Support', icon: HelpCircle },
];

function NavItem({
  href, label, icon: Icon, active, collapsed, onClick,
}: {
  href: string; label: string; icon: React.ElementType;
  active: boolean; collapsed: boolean; onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group overflow-hidden',
        active
          ? 'bg-red-500/10 text-red-300 border border-red-500/18'
          : 'text-slate-500 hover:text-slate-200 hover:bg-white/5',
        collapsed && 'justify-center px-0'
      )}
      title={collapsed ? label : undefined}
    >
      {/* Active left bar */}
      {active && (
        <motion.span
          layoutId="sidebar-active-bar"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-linear-to-b from-red-400 to-red-600 rounded-r-full"
        />
      )}

      <Icon
        className={cn(
          'w-4.5 h-4.5 shrink-0 relative z-10',
          active ? 'text-red-400' : 'text-slate-500 group-hover:text-slate-300'
        )}
        suppressHydrationWarning
      />

      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15 }}
            className="relative z-10 whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

function MobileNav({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
      <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-700">
        Navigation
      </p>
      {navItems.map(({ href, label, icon, exact }) => {
        const active = exact ? pathname === href : (href !== '/dashboard' && pathname.startsWith(href));
        return (
          <NavItem key={href} href={href} label={label} icon={icon} active={active} collapsed={false} onClick={onClose} />
        );
      })}
    </nav>
  );
}

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { mobileOpen, setMobileOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <motion.aside
        animate={{ width: collapsed ? 68 : 252 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative hidden lg:flex flex-col h-screen bg-slate-950 border-r border-white/5 shrink-0 overflow-hidden"
      >
        {/* Top accent line */}
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-red-600/40 via-red-500/20 to-transparent" />

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center h-16 px-4 border-b border-white/5 shrink-0 hover:bg-white/3 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center shrink-0 shadow-md shadow-red-950/50">
            <Shield className="w-4 h-4 text-white" suppressHydrationWarning />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="ml-2.5 text-white font-black text-lg whitespace-nowrap tracking-tight"
              >
                {APP_NAME}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* Search */}
        {!collapsed && (
          <div className="px-3 py-3 border-b border-white/5 shrink-0">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/4 border border-white/6 text-slate-500 cursor-pointer hover:bg-white/6 hover:border-white/10 transition-all duration-200">
              <Search className="w-3.5 h-3.5 shrink-0" suppressHydrationWarning />
              <span className="text-sm flex-1">Search...</span>
              <kbd className="text-[10px] bg-white/8 px-1.5 py-0.5 rounded text-slate-600 font-mono">⌘K</kbd>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {!collapsed && (
            <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-700">
              Navigation
            </p>
          )}
          {navItems.map(({ href, label, icon, exact }) => {
            const active = exact ? pathname === href : (href !== '/dashboard' && pathname.startsWith(href));
            return (
              <NavItem key={href} href={href} label={label} icon={icon} active={active} collapsed={collapsed} />
            );
          })}

          {/* Bottom utility links */}
          {!collapsed && (
            <div className="pt-4 mt-4 border-t border-white/5 space-y-0.5">
              <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-700">
                Account
              </p>
              {bottomItems.map(({ href, label, icon }) => (
                <NavItem key={label} href={href} label={label} icon={icon} active={false} collapsed={false} />
              ))}
            </div>
          )}
        </nav>

        {/* User section */}
        <div className="border-t border-white/5 p-3 shrink-0">
          <div
            className={cn(
              'flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer',
              collapsed && 'justify-center px-0'
            )}
          >
            <div className="relative shrink-0">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/avatars/admin.jpg" />
                <AvatarFallback className="bg-red-600 text-white text-xs font-bold">GA</AvatarFallback>
              </Avatar>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-white text-sm font-semibold truncate leading-tight">Gareth Admin</p>
                  <p className="text-slate-600 text-xs truncate">Club Admin</p>
                </motion.div>
              )}
            </AnimatePresence>
            {!collapsed && (
              <LogOut className="w-4 h-4 text-slate-600 hover:text-slate-400 shrink-0 cursor-pointer transition-colors" suppressHydrationWarning />
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-18 w-6 h-6 rounded-full bg-slate-800 border border-white/10 text-slate-500 hover:text-white flex items-center justify-center transition-all duration-200 shadow-md hover:bg-slate-700 z-10"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight className="w-3 h-3" suppressHydrationWarning />
            : <ChevronLeft className="w-3 h-3" suppressHydrationWarning />
          }
        </button>
      </motion.aside>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-40 w-64 flex flex-col bg-slate-950 border-r border-white/5 lg:hidden overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-red-600/40 via-red-500/20 to-transparent" />

            {/* Logo + close */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-white/5 shrink-0">
              <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md shadow-red-950/50">
                  <Shield className="w-4 h-4 text-white" suppressHydrationWarning />
                </div>
                <span className="text-white font-black text-lg tracking-tight">{APP_NAME}</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" suppressHydrationWarning />
              </button>
            </div>

            {/* Search */}
            <div className="px-3 py-3 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/4 border border-white/6 text-slate-500">
                <Search className="w-3.5 h-3.5 shrink-0" suppressHydrationWarning />
                <span className="text-sm">Search...</span>
              </div>
            </div>

            <MobileNav pathname={pathname} onClose={() => setMobileOpen(false)} />

            {/* User */}
            <div className="border-t border-white/5 p-3 shrink-0">
              <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                <div className="relative shrink-0">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/avatars/admin.jpg" />
                    <AvatarFallback className="bg-red-600 text-white text-xs font-bold">GA</AvatarFallback>
                  </Avatar>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate leading-tight">Gareth Admin</p>
                  <p className="text-slate-600 text-xs truncate">Club Admin</p>
                </div>
                <LogOut className="w-4 h-4 text-slate-600 shrink-0" suppressHydrationWarning />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
