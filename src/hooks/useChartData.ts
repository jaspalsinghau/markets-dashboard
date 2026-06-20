'use client';

import useSWR from 'swr';
import type { Instrument, OHLCVBar } from '@/types/market';

function buildTiingoUrl(instrument: Instrument): string {
  const token = process.env.NEXT_PUBLIC_TIINGO_API_KEY ?? '';
  const start = new Date();
  start.setFullYear(start.getFullYear() - 1);
  const startDate = start.toISOString().slice(0, 10);

  if (instrument.type === 'forex') {
    return `https://api.tiingo.com/tiingo/fx/${instrument.ticker}/prices?startDate=${startDate}&resampleFreq=1day&token=${token}`;
  }
  return `https://api.tiingo.com/tiingo/daily/${instrument.ticker}/prices?startDate=${startDate}&token=${token}`;
}

function normalizeBar(bar: Record<string, unknown>): OHLCVBar {
  return {
    time: (bar.date as string).slice(0, 10),
    open: bar.open as number,
    high: bar.high as number,
    low: bar.low as number,
    close: bar.close as number,
    volume: bar.volume as number | undefined,
  };
}

const fetcher = (url: string): Promise<OHLCVBar[]> =>
  fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(`Fetch failed: ${r.status}`);
      return r.json();
    })
    .then((raw: Record<string, unknown>[]) => raw.map(normalizeBar));

export function useChartData(instrument: Instrument) {
  const url = buildTiingoUrl(instrument);
  const { data, error, isLoading } = useSWR<OHLCVBar[]>(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300_000,
  });
  return { data, error, isLoading };
}
