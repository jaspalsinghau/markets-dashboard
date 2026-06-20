import type { Instrument } from '@/types/market';

export const INSTRUMENTS: Instrument[] = [
  { key: 'qqq',    ticker: 'QQQ',    label: 'Nasdaq (QQQ)',       type: 'stock' },
  { key: 'spy',    ticker: 'SPY',    label: 'S&P 500 (SPY)',      type: 'stock' },
  { key: 'dia',    ticker: 'DIA',    label: 'Dow Jones (DIA)',    type: 'stock' },
  { key: 'urth',   ticker: 'URTH',   label: 'MSCI World (URTH)', type: 'stock' },
  { key: 'gld',    ticker: 'GLD',    label: 'Gold (GLD)',         type: 'stock' },
  { key: 'audusd', ticker: 'audusd', label: 'AUD/USD',            type: 'forex' },
];
