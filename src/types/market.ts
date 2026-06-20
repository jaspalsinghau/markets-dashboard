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
