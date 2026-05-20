import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { getClub } from '@/services/club.service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Globe, Mail, Phone, Trophy, Shield, Share2, Link2, Play, Edit, Calendar, Star } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';

export const metadata = { title: 'Club Management' };

export default async function ClubPage() {
  const club = await getClub('1');

  return (
    <>
      <DashboardHeader
        title="Club Management"
        subtitle={club.name}
        actions={
          <Button className="bg-red-600 hover:bg-red-500 text-white h-9 px-4 text-sm gap-2 shadow-lg shadow-red-950/40 font-semibold">
            <Edit className="w-3.5 h-3.5" />
            Edit Club
          </Button>
        }
      />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">

        {/* Club hero card */}
        <div className="relative premium-card rounded-2xl p-6 sm:p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-red-600/5 blur-3xl pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-red-600/40 via-red-500/20 to-transparent" />

          <div className="relative flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-red-600/20 to-red-900/10 border border-red-500/20 flex items-center justify-center shrink-0">
              <Shield className="w-10 h-10 text-red-400" suppressHydrationWarning />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{club.name}</h2>
                <Badge className="bg-emerald-500/12 text-emerald-400 border border-emerald-500/20 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5 inline-block" />
                  Active
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                <span className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
                  <MapPin className="w-3.5 h-3.5" suppressHydrationWarning />
                  {club.location}
                </span>
                <span className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
                  <Calendar className="w-3.5 h-3.5" suppressHydrationWarning />
                  Founded {club.founded}
                </span>
                {club.website && (
                  <span className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
                    <Globe className="w-3.5 h-3.5" suppressHydrationWarning />
                    {club.website}
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">{club.description}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title="Total Players" value={club.stats.totalPlayers} icon="Users" delay={0} />
          <StatCard title="Total Teams" value={club.stats.totalTeams} icon="Shield" delay={0.06} />
          <StatCard title="Leagues Won" value={club.stats.leaguesWon} icon="Trophy" delay={0.12} variant="gradient" />
          <StatCard title="Years Active" value={club.stats.yearsActive} icon="Calendar" delay={0.18} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Contact */}
          <div className="premium-card rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5 flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-500" suppressHydrationWarning />
              Contact Information
            </h3>
            <div className="space-y-4">
              {club.email && (
                <div className="flex items-center gap-3 py-2.5 border-b border-white/4">
                  <div className="w-8 h-8 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-slate-500" suppressHydrationWarning />
                  </div>
                  <span className="text-slate-300 text-sm">{club.email}</span>
                </div>
              )}
              {club.phone && (
                <div className="flex items-center gap-3 py-2.5 border-b border-white/4">
                  <div className="w-8 h-8 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-slate-500" suppressHydrationWarning />
                  </div>
                  <span className="text-slate-300 text-sm">{club.phone}</span>
                </div>
              )}
              {club.website && (
                <div className="flex items-center gap-3 py-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center shrink-0">
                    <Globe className="w-3.5 h-3.5 text-slate-500" suppressHydrationWarning />
                  </div>
                  <a href={club.website} className="text-red-400 hover:text-red-300 text-sm transition-colors">
                    {club.website}
                  </a>
                </div>
              )}
            </div>

            {club.socialLinks && (
              <div className="mt-6 pt-5 border-t border-white/5">
                <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-3">Social Media</p>
                <div className="flex items-center gap-2.5">
                  {club.socialLinks.twitter && (
                    <a href={club.socialLinks.twitter} className="w-9 h-9 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center text-slate-500 hover:text-white hover:bg-blue-500/15 hover:border-blue-500/20 transition-all">
                      <Share2 className="w-4 h-4" suppressHydrationWarning />
                    </a>
                  )}
                  {club.socialLinks.facebook && (
                    <a href={club.socialLinks.facebook} className="w-9 h-9 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center text-slate-500 hover:text-white hover:bg-blue-700/15 hover:border-blue-700/20 transition-all">
                      <Globe className="w-4 h-4" suppressHydrationWarning />
                    </a>
                  )}
                  {club.socialLinks.instagram && (
                    <a href={club.socialLinks.instagram} className="w-9 h-9 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center text-slate-500 hover:text-white hover:bg-pink-500/15 hover:border-pink-500/20 transition-all">
                      <Link2 className="w-4 h-4" suppressHydrationWarning />
                    </a>
                  )}
                  {club.socialLinks.youtube && (
                    <a href={club.socialLinks.youtube} className="w-9 h-9 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center text-slate-500 hover:text-white hover:bg-red-600/15 hover:border-red-600/20 transition-all">
                      <Play className="w-4 h-4" suppressHydrationWarning />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Honours */}
          <div className="premium-card rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" suppressHydrationWarning />
              Honours & Achievements
            </h3>
            <div className="space-y-2.5">
              {club.achievements?.slice(0, 6).map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 hover:border-white/8 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center shrink-0">
                    <Star className="w-3.5 h-3.5 text-amber-400" suppressHydrationWarning />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-white font-medium truncate block">{achievement.title}</span>
                    {achievement.description && (
                      <span className="text-xs text-slate-600 truncate block">{achievement.description}</span>
                    )}
                  </div>
                  <Badge variant="outline" className="text-[10px] border-white/8 text-slate-500 shrink-0">
                    {achievement.year}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sponsors */}
        {club.sponsors && club.sponsors.length > 0 && (
          <div className="premium-card rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5">Club Sponsors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {club.sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="bg-white/3 border border-white/5 rounded-xl p-4 text-center hover:bg-white/5 hover:border-white/10 transition-all duration-200 group"
                >
                  <div className="text-[10px] text-slate-600 mb-1.5 uppercase tracking-wider">
                    {sponsor.tier}
                  </div>
                  <div className="text-sm font-semibold text-white group-hover:text-red-200 transition-colors">
                    {sponsor.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
