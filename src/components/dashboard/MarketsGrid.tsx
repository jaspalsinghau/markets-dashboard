'use client';

import { INSTRUMENTS } from '@/lib/chartConfig';
import ChartCard from '@/components/charts/ChartCard';

export default function MarketsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
      {INSTRUMENTS.map((instrument) => (
        <ChartCard key={instrument.key} instrument={instrument} />
      ))}
    </div>
  );
}
