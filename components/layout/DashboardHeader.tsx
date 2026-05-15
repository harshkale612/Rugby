'use client';

import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <header className="h-16 border-b border-white/5 bg-slate-900/50 backdrop-blur-sm flex items-center px-6 gap-4 flex-shrink-0">
      <div className="flex-1">
        <h1 className="text-white font-semibold text-lg leading-tight">{title}</h1>
        {subtitle && <p className="text-slate-500 text-xs">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/5 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </Button>

        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage src="/avatars/admin.jpg" />
          <AvatarFallback className="bg-red-600 text-white text-xs">GA</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
