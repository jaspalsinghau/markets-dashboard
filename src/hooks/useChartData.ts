'use client';

import useSWR from 'swr';
import type { OHLCVBar } from '@/types/market';

const fetcher = (url: string): Promise<OHLCVBar[]> =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`Fetch failed: ${r.status}`);
    return r.json();
  });

export function useChartData(key: string) {
  const { data, error, isLoading } = useSWR<OHLCVBar[]>(
    `/api/market-data/${key}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
    }
  );

  return { data, error, isLoading };
}
