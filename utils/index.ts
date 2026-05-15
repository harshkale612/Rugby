import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatShortDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

export function formatTime(timeString: string): string {
  const [h, m] = timeString.split(':');
  const d = new Date();
  d.setHours(Number(h), Number(m));
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birth = new Date(dateOfBirth);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function formatStat(value: number, suffix?: string): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k${suffix ?? ''}`;
  return `${value}${suffix ?? ''}`;
}

export function getFormColor(result: 'W' | 'L' | 'D'): string {
  const map = { W: 'bg-green-500', L: 'bg-red-500', D: 'bg-yellow-500' };
  return map[result];
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    active: 'text-green-600 bg-green-50',
    inactive: 'text-gray-500 bg-gray-100',
    injured: 'text-red-600 bg-red-50',
    suspended: 'text-yellow-600 bg-yellow-50',
    scheduled: 'text-blue-600 bg-blue-50',
    live: 'text-green-600 bg-green-50',
    completed: 'text-gray-600 bg-gray-100',
    postponed: 'text-yellow-600 bg-yellow-50',
    cancelled: 'text-red-600 bg-red-50',
    registered: 'text-green-600 bg-green-50',
    pending: 'text-yellow-600 bg-yellow-50',
    expired: 'text-red-600 bg-red-50',
  };
  return map[status] ?? 'text-gray-500 bg-gray-100';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}
