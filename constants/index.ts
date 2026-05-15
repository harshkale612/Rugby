export const APP_NAME = 'RugbyHub';
export const APP_TAGLINE = 'The Complete Rugby Management Platform';
export const APP_DESCRIPTION = 'Manage your rugby club, teams, players, and leagues with the most powerful sports management platform built for rugby.';

export const RUGBY_POSITIONS: string[] = [
  'Loosehead Prop',
  'Hooker',
  'Tighthead Prop',
  'Lock',
  'Blindside Flanker',
  'Openside Flanker',
  'Number 8',
  'Scrum-half',
  'Fly-half',
  'Left Wing',
  'Inside Centre',
  'Outside Centre',
  'Right Wing',
  'Fullback',
];

export const TEAM_CATEGORIES = [
  { value: 'senior_men', label: 'Senior Men' },
  { value: 'senior_women', label: 'Senior Women' },
  { value: 'u18', label: 'Under 18' },
  { value: 'u16', label: 'Under 16' },
  { value: 'u14', label: 'Under 14' },
  { value: 'u12', label: 'Under 12' },
  { value: 'u10', label: 'Under 10' },
  { value: 'veterans', label: 'Veterans' },
];

export const USER_ROLES = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'club_admin', label: 'Club Admin' },
  { value: 'coach', label: 'Coach' },
  { value: 'player', label: 'Player' },
  { value: 'parent', label: 'Parent' },
  { value: 'fan', label: 'Fan' },
];

export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/leagues', label: 'Leagues' },
  { href: '/club/1', label: 'Our Club' },
];

export const DASHBOARD_NAV = [
  { href: '/dashboard', label: 'Overview', icon: 'LayoutDashboard' },
  { href: '/dashboard/club', label: 'Club', icon: 'Shield' },
  { href: '/dashboard/teams', label: 'Teams', icon: 'Users' },
  { href: '/dashboard/players', label: 'Players', icon: 'User' },
  { href: '/dashboard/leagues', label: 'Leagues', icon: 'Trophy' },
];

export const PLATFORM_STATS = [
  { label: 'Active Clubs', value: '250+', description: 'Rugby clubs on the platform' },
  { label: 'Players Registered', value: '12,000+', description: 'Active players across all clubs' },
  { label: 'Teams Managed', value: '1,800+', description: 'Squads across all age groups' },
  { label: 'Leagues', value: '180+', description: 'Competitions managed' },
];
