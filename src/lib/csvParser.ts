import type { OHLCVBar } from '@/types/market';

export function parseCsv(text: string): OHLCVBar[] {
  const lines = text.trim().split('\n');
  return lines
    .slice(1) // skip header
    .map((line) => {
      const [date, open, high, low, close, volume] = line.split(',');
      return {
        time: date.trim(),
        open: parseFloat(open),
        high: parseFloat(high),
        low: parseFloat(low),
        close: parseFloat(close),
        volume: volume && volume.trim() ? parseFloat(volume) : undefined,
      };
    })
    .filter((b) => !isNaN(b.open) && b.time.length === 10);
}
