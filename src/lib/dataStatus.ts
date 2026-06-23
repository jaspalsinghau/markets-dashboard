export function isBusinessDay(date: Date): boolean {
  const day = date.getUTCDay();
  return day !== 0 && day !== 6; // 0 = Sunday, 6 = Saturday
}

export function businessDaysSince(dateStr: string): number {
  const dataDate = new Date(dateStr + 'T00:00:00Z');
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (dataDate >= today) return 0;

  let count = 0;
  const current = new Date(dataDate);
  while (current < today) {
    current.setUTCDate(current.getUTCDate() + 1);
    if (isBusinessDay(current)) count++;
  }
  return count;
}

export function getDataStaleness(lastDateStr: string): 'fresh' | 'warn' | 'stale' {
  const days = businessDaysSince(lastDateStr);
  if (days === 0) return 'fresh';
  if (days <= 2) return 'warn';
  return 'stale';
}
