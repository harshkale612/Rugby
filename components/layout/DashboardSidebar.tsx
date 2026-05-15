'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Shield, Users, User, Trophy,
  ChevronLeft, ChevronRight, LogOut, Search
} from 'lucide-react';
import { cn } from '@/utils';
import { APP_NAME } from '@/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/club', label: 'Club', icon: Shield },
  { href: '/dashboard/teams', label: 'Teams', icon: Users },
  { href: '/dashboard/players', label: 'Players', icon: User },
  { href: '/dashboard/leagues', label: 'Leagues', icon: Trophy },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative flex flex-col h-screen bg-slate-900 border-r border-white/5 shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center h-16 px-4 border-b border-white/5 shrink-0 hover:bg-white/5 transition-colors">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-2.5 text-white font-bold text-lg whitespace-nowrap overflow-hidden"
            >
              {APP_NAME}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-white/5">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-slate-400">
            <Search className="w-4 h-4 shrink-0" />
            <span className="text-sm">Search...</span>
            <kbd className="ml-auto text-xs bg-white/10 px-1.5 py-0.5 rounded text-slate-500">⌘K</kbd>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                active
                  ? 'bg-red-600/15 text-red-400'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              )}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-red-600/10 rounded-xl border border-red-500/20"
                />
              )}
              <Icon
                className={cn(
                  'w-5 h-5 shrink-0 relative z-10',
                  active ? 'text-red-400' : 'text-slate-400 group-hover:text-white'
                )}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10 whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-white/5 p-3 shrink-0">
        <div
          className={cn(
            'flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer',
            collapsed && 'justify-center px-0'
          )}
        >
          <Avatar className="w-8 h-8 shrink-0">
            <AvatarImage src="/avatars/admin.jpg" />
            <AvatarFallback className="bg-red-600 text-white text-xs">GA</AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-white text-sm font-medium truncate">Gareth Admin</p>
                <p className="text-slate-500 text-xs truncate">Club Admin</p>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && <LogOut className="w-4 h-4 text-slate-500 hover:text-white shrink-0" />}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-slate-800 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors shadow-lg z-10"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}
