'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import type { Instrument, Period } from '@/types/market';
import { PERIOD_DAYS } from '@/types/market';
import { useChartData } from '@/hooks/useChartData';
import { calculateEMA } from '@/lib/ema';

const CandlestickChart = dynamic(() => import('./CandlestickChart'), { ssr: false });

interface Props {
  instrument: Instrument;
  period: Period;
}

export default function ChartCard({ instrument, period }: Props) {
  const { data, error, isLoading } = useChartData(instrument);

  const { slicedData, slicedEma50, slicedEma200, borderColor, changeText, changeColor } = useMemo(() => {
    if (!data || data.length < 2) {
      return {
        slicedData: [],
        slicedEma50: [],
        slicedEma200: [],
        borderColor: 'border-gray-200',
        changeText: '',
        changeColor: '',
      };
    }

    // EMA calculated on full dataset for accuracy
    const closes = data.map((b) => b.close);
    const ema50 = calculateEMA(closes, 50);
    const ema200 = calculateEMA(closes, 200);

    // Day change always uses the full dataset's last two bars
    const last = data[data.length - 1];
    const prev = data[data.length - 2];
    const dayChange = last.close - prev.close;
    const dayChangePct = (dayChange / prev.close) * 100;
    const borderColor = dayChange >= 0 ? 'border-green-500' : 'border-red-500';
    const changeColor = dayChange >= 0 ? 'text-green-600' : 'text-red-600';
    const sign = dayChange >= 0 ? '+' : '';
    const changeText = `${sign}${dayChangePct.toFixed(2)}%`;

    // Slice to the selected period window
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - PERIOD_DAYS[period]);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    const startIdx = data.findIndex((b) => b.time >= cutoffStr);
    const idx = startIdx >= 0 ? startIdx : 0;

    return {
      slicedData: data.slice(idx),
      slicedEma50: ema50.slice(idx),
      slicedEma200: ema200.slice(idx),
      borderColor,
      changeText,
      changeColor,
    };
  }, [data, period]);

  return (
    <div className={`bg-white rounded-xl border-2 ${borderColor} shadow-sm flex flex-col overflow-hidden`}>
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
        <span className="font-semibold text-gray-800 text-sm">{instrument.label}</span>
        {changeText && (
          <span className={`text-xs font-medium ${changeColor}`}>{changeText}</span>
        )}
      </div>

      <div className="flex-1 min-h-0 h-96">
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-xs text-gray-400">Loading...</div>
          </div>
        )}
        {error && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-xs text-red-400">Failed to load data</div>
          </div>
        )}
        {slicedData.length > 0 && (
          <CandlestickChart data={slicedData} ema50={slicedEma50} ema200={slicedEma200} />
        )}
      </div>

      <div className="px-3 py-1.5 border-t border-gray-100 flex items-center gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="inline-block w-4 h-0.5 bg-blue-500" />
          EMA 50
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-4 h-0.5 bg-amber-500" />
          EMA 200
        </span>
      </div>
    </div>
  );
}
