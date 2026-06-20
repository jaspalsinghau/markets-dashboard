'use client';

import useSWR from 'swr';
import type { Instrument, OHLCVBar } from '@/types/market';
import { parseCsv } from '@/lib/csvParser';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const fetcher = (url: string): Promise<OHLCVBar[]> =>
  fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(`Failed to load ${url}: ${r.status}`);
      return r.text();
    })
    .then(parseCsv);

export function useChartData(instrument: Instrument) {
  const csvUrl = `${BASE}/data/${instrument.ticker}.csv`;
  const { data, error, isLoading } = useSWR<OHLCVBar[]>(csvUrl, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60 * 60 * 1000,
  });
  return { data, error, isLoading };
}
