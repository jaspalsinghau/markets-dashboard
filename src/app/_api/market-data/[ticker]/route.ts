// Server-side Tiingo proxy route — for Node.js/Vercel deployments only.
// To activate: move this file to src/app/api/market-data/[ticker]/route.ts
// and remove `output: 'export'` from next.config.ts.
// Not used in the GitHub Pages static build (client fetches Tiingo directly).
import { NextRequest, NextResponse } from 'next/server';
import { INSTRUMENTS } from '@/lib/chartConfig';
import { fetchStockData, fetchForexData } from '@/lib/tiingo';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ ticker: string }> }
) {
  const { ticker } = await params;
  const instrument = INSTRUMENTS.find((i) => i.key === ticker);

  if (!instrument) {
    return NextResponse.json({ error: 'Unknown ticker' }, { status: 404 });
  }

  try {
    const data =
      instrument.type === 'forex'
        ? await fetchForexData(instrument.ticker)
        : await fetchStockData(instrument.ticker);

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 's-maxage=900, stale-while-revalidate=60' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
