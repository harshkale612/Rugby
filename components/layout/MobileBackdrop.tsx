'use client';

import { useSidebar } from './SidebarContext';

export function MobileBackdrop() {
  const { mobileOpen, setMobileOpen } = useSidebar();
  if (!mobileOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/60 z-30 lg:hidden"
      onClick={() => setMobileOpen(false)}
    />
  );
}
