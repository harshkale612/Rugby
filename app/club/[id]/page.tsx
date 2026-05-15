import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getClub } from '@/services/club.service';
import { getTeams } from '@/services/team.service';
import { TeamCard } from '@/components/common/TeamCard';
import { StatCard } from '@/components/common/StatCard';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Globe, Mail, Phone, Trophy, Users, Shield, Share2, Link2, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/common/SectionHeader';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const club = await getClub(id);
  return { title: club?.name ?? 'Club', description: club?.description };
}

export default async function ClubPage({ params }: Props) {
  const { id } = await params;
  const [club, teams] = await Promise.all([getClub(id), getTeams(id)]);
  if (!club) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative min-h-[50vh] flex items-end bg-gradient-to-br from-slate-950 via-red-950/30 to-slate-900 pt-20">
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-red-600/8 blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-600/30 to-red-900/30 border border-red-500/30 flex items-center justify-center">
                <Shield className="w-12 h-12 text-red-400" />
              </div>
              <div>
                <Badge className="bg-white/10 text-slate-300 border-white/10 mb-3 text-xs">
                  Est. {club.founded}
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">{club.name}</h1>
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-4 h-4" />
                  <span>{club.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Players" value={club.stats.totalPlayers} icon="Users" delay={0} />
            <StatCard title="Total Teams" value={club.stats.totalTeams} icon="Shield" delay={0.1} />
            <StatCard title="Leagues Won" value={club.stats.leaguesWon} icon="Trophy" delay={0.2} variant="gradient" />
            <StatCard title="Win Rate" value={`${club.stats.winRate}%`} icon="TrendingUp" delay={0.3} />
          </div>

          {/* About */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SectionHeader eyebrow="About" title="Our Club Story" />
              <p className="text-slate-400 leading-relaxed text-lg">{club.description}</p>
              {club.socialLinks && (
                <div className="flex items-center gap-3 mt-8">
                  {club.socialLinks.twitter && (
                    <a href={club.socialLinks.twitter} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-500/20 transition-all">
                      <Share2 className="w-5 h-5" />
                    </a>
                  )}
                  {club.socialLinks.facebook && (
                    <a href={club.socialLinks.facebook} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-700/20 transition-all">
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                  {club.socialLinks.instagram && (
                    <a href={club.socialLinks.instagram} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-pink-500/20 transition-all">
                      <Link2 className="w-5 h-5" />
                    </a>
                  )}
                  {club.socialLinks.youtube && (
                    <a href={club.socialLinks.youtube} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600/20 transition-all">
                      <Play className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-semibold mb-5">Contact Information</h3>
              {club.email && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <a href={`mailto:${club.email}`} className="text-slate-300 hover:text-white transition-colors">{club.email}</a>
                </div>
              )}
              {club.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300">{club.phone}</span>
                </div>
              )}
              {club.website && (
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-slate-500" />
                  <a href={club.website} className="text-red-400 hover:text-red-300 transition-colors">{club.website}</a>
                </div>
              )}
            </div>
          </div>

          {/* Teams */}
          <div>
            <SectionHeader eyebrow="Teams" title="Our Squads" subtitle="All teams competing across age groups and categories." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {teams.map((team, idx) => (
                <TeamCard key={team.id} team={team} delay={idx * 0.08} />
              ))}
            </div>
          </div>

          {/* Achievements */}
          {club.achievements && club.achievements.length > 0 && (
            <div>
              <SectionHeader eyebrow="Honours" title="Club Achievements" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {club.achievements.map((a) => (
                  <div key={a.id} className="flex items-start gap-4 p-5 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{a.title}</div>
                      {a.description && <div className="text-slate-500 text-xs mt-1">{a.description}</div>}
                      <Badge variant="outline" className="text-xs border-white/10 text-slate-400 mt-2">{a.year}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sponsors */}
          {club.sponsors && club.sponsors.length > 0 && (
            <div>
              <SectionHeader eyebrow="Sponsors" title="Our Partners" centered />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {club.sponsors.map((sponsor) => (
                  <div key={sponsor.id} className="bg-slate-900/50 border border-white/5 rounded-xl p-4 text-center hover:border-white/10 transition-colors">
                    <div className="text-xs text-slate-500 mb-2 capitalize">{sponsor.tier}</div>
                    <div className="text-sm font-semibold text-white">{sponsor.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
