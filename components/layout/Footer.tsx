import Link from 'next/link';
import { Shield, Mail, Phone, MapPin, Share2, Globe, Link2, Play } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from '@/constants';

const footerLinks = {
  Platform: [
    { label: 'Club Management', href: '/club/1' },
    { label: 'Team Control', href: '/dashboard/teams' },
    { label: 'Player Management', href: '/dashboard/players' },
    { label: 'League Tables', href: '/leagues' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Partners', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'API Docs', href: '#' },
  ],
};

const socials = [
  { icon: Share2, href: '#', label: 'Twitter / X' },
  { icon: Globe, href: '#', label: 'Facebook' },
  { icon: Link2, href: '#', label: 'Instagram' },
  { icon: Play, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" suppressHydrationWarning />
              </div>
              <span className="text-white font-bold text-xl">{APP_NAME}</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              {APP_TAGLINE}. Built for rugby clubs, by people who love the game.
            </p>
            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" suppressHydrationWarning />
                <span>hello@rugbyhub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" suppressHydrationWarning />
                <span>+44 20 7946 0123</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" suppressHydrationWarning />
                <span>Cardiff, Wales, UK</span>
              </div>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" suppressHydrationWarning />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
