import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { getClub } from '@/services/club.service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Globe, Mail, Phone, Trophy, Shield, Share2, Link2, Play, Edit, Calendar } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';

export const metadata = { title: 'Club Management' };

export default async function ClubPage() {
  const club = await getClub('1');

  return (
    <>
      <DashboardHeader title="Club Management" subtitle={club.name} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* Club hero */}
        <div className="relative bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-900 border border-white/5 rounded-2xl p-5 sm:p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-red-600/5 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600/20 to-red-900/20 border border-red-500/20 flex items-center justify-center shrink-0">
              <Shield className="w-10 h-10 text-red-400" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-3xl font-black text-white">{club.name}</h2>
                <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">Active</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-4">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{club.location}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Founded {club.founded}</span>
                {club.website && <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" />{club.website}</span>}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">{club.description}</p>
            </div>
            <Button variant="outline" className="border-white/10 text-slate-300 hover:text-white hover:bg-white/5 gap-2 flex-shrink-0">
              <Edit className="w-4 h-4" />
              Edit Club
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title="Total Players" value={club.stats.totalPlayers} icon="Users" delay={0} />
          <StatCard title="Total Teams" value={club.stats.totalTeams} icon="Shield" delay={0.1} />
          <StatCard title="Leagues Won" value={club.stats.leaguesWon} icon="Trophy" delay={0.2} variant="gradient" />
          <StatCard title="Years Active" value={club.stats.yearsActive} icon="Calendar" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact */}
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-5">Contact Information</h3>
            <div className="space-y-4">
              {club.email && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span className="text-slate-300">{club.email}</span>
                </div>
              )}
              {club.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span className="text-slate-300">{club.phone}</span>
                </div>
              )}
              {club.website && (
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <a href={club.website} className="text-red-400 hover:text-red-300 transition-colors">{club.website}</a>
                </div>
              )}
            </div>

            {/* Social */}
            {club.socialLinks && (
              <div className="mt-6 pt-6 border-t border-white/5">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Social Media</h4>
                <div className="flex items-center gap-3">
                  {club.socialLinks.twitter && (
                    <a href={club.socialLinks.twitter} className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-500/20 transition-all">
                      <Share2 className="w-4 h-4" />
                    </a>
                  )}
                  {club.socialLinks.facebook && (
                    <a href={club.socialLinks.facebook} className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-700/20 transition-all">
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  {club.socialLinks.instagram && (
                    <a href={club.socialLinks.instagram} className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-pink-500/20 transition-all">
                      <Link2 className="w-4 h-4" />
                    </a>
                  )}
                  {club.socialLinks.youtube && (
                    <a href={club.socialLinks.youtube} className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600/20 transition-all">
                      <Play className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Achievements */}
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-5">Honours & Achievements</h3>
            <div className="space-y-3">
              {club.achievements?.slice(0, 6).map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                  <Trophy className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-white font-medium truncate block">{achievement.title}</span>
                    {achievement.description && (
                      <span className="text-xs text-slate-500 truncate block">{achievement.description}</span>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs border-white/10 text-slate-400 flex-shrink-0">
                    {achievement.year}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sponsors */}
        {club.sponsors && club.sponsors.length > 0 && (
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-5">Club Sponsors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {club.sponsors.map((sponsor) => (
                <div key={sponsor.id} className="bg-white/3 border border-white/5 rounded-xl p-4 text-center hover:bg-white/5 transition-colors">
                  <div className="text-xs text-slate-500 mb-1 capitalize">{sponsor.tier}</div>
                  <div className="text-sm font-semibold text-white">{sponsor.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
