import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatINRCrore(amount: number): string {
  if (amount >= 1e7) return `${(amount / 1e7).toFixed(1)} Cr`;
  if (amount >= 1e5) return `${(amount / 1e5).toFixed(1)} L`;
  return formatINR(amount);
}

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...opts,
  });
}

export function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [604800, 'week'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function getGrade(marks: number): string {
  if (marks >= 90) return 'O';
  if (marks >= 80) return 'A+';
  if (marks >= 70) return 'A';
  if (marks >= 60) return 'B+';
  if (marks >= 50) return 'B';
  if (marks >= 40) return 'C';
  return 'F';
}

export function gradePoints(grade: string): number {
  const map: Record<string, number> = {
    O: 10,
    'A+': 9,
    A: 8,
    'B+': 7,
    B: 6,
    C: 5,
    F: 0,
  };
  return map[grade] ?? 0;
}

export function truncate(str: string, len = 60): string {
  return str.length > len ? `${str.slice(0, len)}…` : str;
}

export function downloadFile(filename: string, content: string, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportCSV(filename: string, rows: object[]) {
  if (!rows.length) return;
  const first = rows[0] as Record<string, unknown>;
  const headers = Object.keys(first);
  const csv = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((h) => {
          const v = (row as Record<string, unknown>)[h];
          const s = typeof v === 'object' ? JSON.stringify(v) : String(v ?? '');
          return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        })
        .join(','),
    ),
  ].join('\n');
  downloadFile(filename, csv, 'text/csv;charset=utf-8;');
}

export function percentColor(p: number): string {
  if (p >= 75) return 'text-success';
  if (p >= 60) return 'text-accent-500';
  return 'text-danger';
}
