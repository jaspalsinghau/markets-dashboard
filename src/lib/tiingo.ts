import type { OHLCVBar } from '@/types/market';

function getStartDate(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d.toISOString().slice(0, 10);
}

function getApiKey(): string {
  const key = process.env.TIINGO_API_KEY;
  if (!key) throw new Error('TIINGO_API_KEY is not set');
  return key;
}

export async function fetchStockData(ticker: string): Promise<OHLCVBar[]> {
  const token = getApiKey();
  const startDate = getStartDate();
  const url = `https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=${startDate}&token=${token}`;
  const res = await fetch(url, { next: { revalidate: 900 } });
  if (!res.ok) throw new Error(`Tiingo stock fetch failed: ${res.status}`);

  const raw = await res.json() as Array<{
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
  }>;

  return raw.map((bar) => ({
    time: bar.date.slice(0, 10),
    open: bar.open,
    high: bar.high,
    low: bar.low,
    close: bar.close,
    volume: bar.volume,
  }));
}

export async function fetchForexData(pair: string): Promise<OHLCVBar[]> {
  const token = getApiKey();
  const startDate = getStartDate();
  const url = `https://api.tiingo.com/tiingo/fx/${pair}/prices?startDate=${startDate}&resampleFreq=1day&token=${token}`;
  const res = await fetch(url, { next: { revalidate: 900 } });
  if (!res.ok) throw new Error(`Tiingo forex fetch failed: ${res.status}`);

  const raw = await res.json() as Array<{
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }>;

  return raw.map((bar) => ({
    time: bar.date.slice(0, 10),
    open: bar.open,
    high: bar.high,
    low: bar.low,
    close: bar.close,
  }));
}
