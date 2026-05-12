import type {SportyritcountddownEventMode} from './sportyritcountddowneventtypes';

export function sportyritcountddownParseDateKey(dateKey: string): Date {
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1, 12, 0, 0, 0);
}

export function sportyritcountddownFormatDateLabel(dateKey: string): string {
  const dt = sportyritcountddownParseDateKey(dateKey);
  return dt.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export type SportyritcountddownCountdownParts = {
  totalDays: number;
  hours: number;
  minutes: number;
  weeks: number;
  months: number;
};

export function sportyritcountddownCountdownParts(
  eventDate: Date,
  mode: SportyritcountddownEventMode,
  now: Date = new Date(),
): SportyritcountddownCountdownParts {
  const t = eventDate.getTime();
  const n = now.getTime();
  const diffMs =
    mode === 'to' ? Math.max(0, t - n) : Math.max(0, n - t);
  const totalDays = Math.floor(diffMs / 86400000);
  const remAfterDays = diffMs - totalDays * 86400000;
  const hours = Math.floor(remAfterDays / 3600000);
  const remAfterHours = remAfterDays - hours * 3600000;
  const minutes = Math.floor(remAfterHours / 60000);
  const weeks = Math.floor(totalDays / 7);
  const months = Math.floor(totalDays / 30);
  return {totalDays, hours, minutes, weeks, months};
}

export function sportyritcountddownDateKeyFromDate(d: Date): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${day}`;
}
