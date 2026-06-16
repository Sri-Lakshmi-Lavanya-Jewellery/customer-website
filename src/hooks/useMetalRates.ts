import { useEffect, useState } from 'react';

/**
 * Live gold & silver rates for the announcement bar / ticker.
 *
 * Source of truth is our own rates service (ported from the Python
 * `safe_price_fetcher`) exposed by the backend at `/api/v1/rates`. The URL is
 * configurable via `VITE_RATES_API_URL` so it can point at the standalone
 * Python service (http://localhost:5006/api/rates) during local dev.
 *
 * The endpoint returns:
 *   { status: "ok", data: {
 *       gold_24k: { price, unit: "1 Gram" },
 *       gold_22k: { price, unit: "1 Gram" },
 *       silver:   { price, unit: "1 KG" },
 *       last_updated, source } }
 *
 * If the service is unreachable the hook returns `null` and consumers should
 * fall back to a static label — no third-party API key is ever shipped.
 */
export interface MetalRates {
  gold24k: number;
  gold22k: number;
  silverPerGram: number;
  silverPerKg: number;
  lastUpdated: string;
  source: string;
}

const RATES_URL: string =
  (import.meta.env.VITE_RATES_API_URL as string | undefined) ||
  'https://silver-website-backend.onrender.com/api/v1/rates';

// Refresh twice an hour — the backend itself only re-fetches a couple of times a day.
const REFRESH_MS = 30 * 60 * 1000;

export function useMetalRates(): MetalRates | null {
  const [rates, setRates] = useState<MetalRates | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6000);
      try {
        const res = await fetch(RATES_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`rates ${res.status}`);
        const json = await res.json();
        const d = json?.data;
        if (!d?.gold_22k?.price && !d?.silver?.price) throw new Error('no rate data');

        const silverPerKg = Number(d?.silver?.price) || 0;
        if (!active) return;
        setRates({
          gold24k: Number(d?.gold_24k?.price) || 0,
          gold22k: Number(d?.gold_22k?.price) || 0,
          silverPerKg,
          silverPerGram: silverPerKg ? silverPerKg / 1000 : 0,
          lastUpdated: d?.last_updated || '',
          source: d?.source || '',
        });
      } catch {
        // Service offline / timed out — keep null, show static label.
        if (active) setRates(null);
      } finally {
        clearTimeout(timer);
      }
    };

    load();
    const t = setInterval(load, REFRESH_MS);
    return () => {
      active = false;
      clearInterval(t);
    };
  }, []);

  return rates;
}

export default useMetalRates;
