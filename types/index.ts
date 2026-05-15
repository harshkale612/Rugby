// Core entity types — Club Management, Team & Squad Control, Player Management, Leagues & Tournaments

export type UserRole = 'super_admin' | 'club_admin' | 'coach' | 'player' | 'parent' | 'fan';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  clubId?: string;
  teamId?: string;
  createdAt: string;
}

export interface Club {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage?: string;
  founded: number;
  location: string;
  city: string;
  country: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  website?: string;
  email?: string;
  phone?: string;
  socialLinks?: SocialLinks;
  stats: ClubStats;
  sponsors?: Sponsor[];
  achievements?: Achievement[];
}

export interface ClubStats {
  totalPlayers: number;
  totalTeams: number;
  leaguesWon: number;
  yearsActive: number;
  totalMatches: number;
  winRate: number;
}

export interface SocialLinks {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

export interface Team {
  id: string;
  clubId: string;
  name: string;
  slug: string;
  category: TeamCategory;
  ageGroup: string;
  description?: string;
  headCoach?: Staff;
  assistantCoaches?: Staff[];
  players: Player[];
  stats: TeamStats;
  leagueId?: string;
  season: string;
  status: 'active' | 'inactive';
}

export type TeamCategory = 'senior_men' | 'senior_women' | 'u18' | 'u16' | 'u14' | 'u12' | 'u10' | 'veterans';

export interface TeamStats {
  played: number;
  won: number;
  drawn: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  triesScored: number;
  triesConceded: number;
  tablePosition?: number;
  points: number;
}

export interface Player {
  id: string;
  clubId: string;
  teamId?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  name: string;
  avatar?: string;
  position: RugbyPosition;
  jerseyNumber?: number;
  dateOfBirth: string;
  nationality: string;
  height?: number;
  weight?: number;
  bio?: string;
  status: 'active' | 'injured' | 'suspended' | 'inactive';
  stats: PlayerStats;
  registrationStatus: 'registered' | 'pending' | 'expired';
  joinedAt: string;
}

export type RugbyPosition =
  | 'Loosehead Prop'
  | 'Hooker'
  | 'Tighthead Prop'
  | 'Lock'
  | 'Blindside Flanker'
  | 'Openside Flanker'
  | 'Number 8'
  | 'Scrum-half'
  | 'Fly-half'
  | 'Left Wing'
  | 'Inside Centre'
  | 'Outside Centre'
  | 'Right Wing'
  | 'Fullback';

export interface PlayerStats {
  matches: number;
  tries: number;
  assists: number;
  tackles: number;
  carries: number;
  metersGained: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  conversionRate?: number;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  email?: string;
  phone?: string;
  bio?: string;
  qualifications?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  year: number;
  description?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website?: string;
  tier: 'title' | 'gold' | 'silver' | 'bronze';
}

export interface League {
  id: string;
  name: string;
  slug: string;
  season: string;
  startDate: string;
  endDate: string;
  format: 'round_robin' | 'knockout' | 'group_stage' | 'league_and_knockout';
  status: 'upcoming' | 'active' | 'completed';
  teams: TeamSummary[];
  standings: Standing[];
  description?: string;
}

export interface TeamSummary {
  id: string;
  name: string;
  shortName?: string;
}

export interface Standing {
  position: number;
  team: TeamSummary;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  pointsDiff: number;
  bonusPoints: number;
  points: number;
  form: ('W' | 'L' | 'D')[];
}

export interface Tournament {
  id: string;
  name: string;
  slug: string;
  startDate: string;
  endDate: string;
  venue?: string;
  teams: TeamSummary[];
  status: 'upcoming' | 'active' | 'completed';
  bracket?: BracketRound[];
  description?: string;
}

export interface BracketRound {
  roundName: string;
  matchups: {
    homeTeam: TeamSummary;
    awayTeam: TeamSummary;
    homeScore?: number;
    awayScore?: number;
    status: 'scheduled' | 'completed';
  }[];
}

export interface Registration {
  id: string;
  playerId: string;
  player: Player;
  teamId: string;
  season: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  submittedAt: string;
  approvedAt?: string;
  paymentStatus?: 'pending' | 'paid' | 'overdue';
  amount?: number;
}

// API types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status: number;
}
