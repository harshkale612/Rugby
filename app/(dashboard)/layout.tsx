import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { MobileBackdrop } from '@/components/layout/MobileBackdrop';
import { SidebarProvider } from '@/components/layout/SidebarContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-slate-950 overflow-hidden">
        <DashboardSidebar />
        <MobileBackdrop />
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
