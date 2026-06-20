export interface OHLCVBar {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export type InstrumentType = 'stock' | 'forex';

export interface Instrument {
  key: string;
  ticker: string;
  label: string;
  type: InstrumentType;
}

export type Period = '1D' | '1W' | '1M' | '3M' | '6M' | '12M';

export const PERIOD_DAYS: Record<Period, number> = {
  '1D':  1,
  '1W':  7,
  '1M':  30,
  '3M':  90,
  '6M':  180,
  '12M': 365,
};
