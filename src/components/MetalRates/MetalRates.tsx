import React from 'react';
import { Clock, Crown, Gem } from 'lucide-react';
import { useMetalRates } from '../../hooks/useMetalRates';

/**
 * Live gold & silver rate ticker.
 * Rates come from our own rates service via {@link useMetalRates} — no
 * third-party API key is shipped to the browser.
 */
export default function MetalRates() {
    const rates = useMetalRates();

    if (!rates) {
        return (
            <div className="flex items-center justify-center py-2">
                <div className="flex items-center gap-2 text-charcoal-muted">
                    <Crown className="w-4 h-4 animate-pulse text-gold-500" />
                    <span className="text-sm font-medium">Fetching today's metal rates…</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center flex-wrap gap-4 md:gap-6 px-4 py-2">
            {/* Live status */}
            <div className="flex items-center gap-2 shrink-0">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs text-charcoal-muted font-medium">Live Rates</span>
            </div>

            {/* Last updated */}
            {rates.lastUpdated && (
                <div className="flex items-center gap-1 text-xs text-charcoal-muted shrink-0">
                    <Clock className="w-3 h-3" />
                    <span>Updated: {rates.lastUpdated}</span>
                </div>
            )}

            {/* Gold */}
            <div className="flex items-center gap-4 shrink-0 bg-gold-50 px-4 py-2 rounded-full border border-gold-200">
                <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-gold-600" />
                    <span className="font-semibold text-gold-700">Gold</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <div className="text-center">
                        <div className="text-[10px] text-gold-600 font-medium tracking-wide">24K /g</div>
                        <div className="font-semibold text-charcoal">₹{rates.gold24k.toFixed(0)}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-[10px] text-gold-600 font-medium tracking-wide">22K /g</div>
                        <div className="font-semibold text-charcoal">₹{rates.gold22k.toFixed(0)}</div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-1 shrink-0">
                <div className="h-6 w-px bg-gold-300 rounded-full" />
                <Gem className="w-3 h-3 text-charcoal-muted" />
                <div className="h-6 w-px bg-silver-300 rounded-full" />
            </div>

            {/* Silver */}
            <div className="flex items-center gap-4 shrink-0 bg-silver-100 px-4 py-2 rounded-full border border-silver-200">
                <div className="flex items-center gap-2">
                    <Gem className="w-4 h-4 text-silver-600" />
                    <span className="font-semibold text-silver-700">Silver</span>
                </div>
                <div className="text-sm text-center">
                    <div className="text-[10px] text-silver-600 font-medium tracking-wide">Per Gram</div>
                    <div className="font-semibold text-charcoal">₹{rates.silverPerGram.toFixed(0)}</div>
                </div>
            </div>

            {/* Assurance */}
            <div className="flex items-center gap-1 shrink-0 bg-white px-3 py-1.5 rounded-full border border-silver-200 shadow-card">
                <Crown className="w-3 h-3 text-gold-600" />
                <span className="text-xs font-medium text-charcoal-light">Certified Pure</span>
            </div>
        </div>
    );
}
