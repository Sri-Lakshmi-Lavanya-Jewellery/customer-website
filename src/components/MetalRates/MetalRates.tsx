import React from 'react';
import { useMetalRates } from '../../hooks/useMetalRates';
// No specific types need to be imported here directly if the hook is well-typed
// and the component only consumes its return values.
// However, if we were to destructure `rates` further or pass parts of it,
// importing MetalRatesData, GoldPrices, SilverPrices could be useful for clarity.

export default function MetalRates() {
    const { rates, loading, lastUpdated } = useMetalRates();

    const renderPriceChange = (change: number, changePercentage: number) => {
        const isPositive = change >= 0;
        const color = isPositive ? 'text-green-600' : 'text-red-600';
        const sign = isPositive ? '+' : '';
        return (
            <span className={`${color} text-xs ml-2`}>
                {sign}{change.toFixed(2)} ({sign}{changePercentage.toFixed(2)}%)
            </span>
        );
    };

    if (loading) {
        return <div className="text-sm text-gray-600 px-4">Loading rates...</div>;
    }

    // Ensure rates and their nested properties are defined before trying to access them
    if (!rates || !rates.gold || !rates.silver) {
        return <div className="text-sm text-gray-600 px-4">Rates data is not available.</div>;
    }

    return (
        <div className="flex items-center space-x-8 px-4">
            {/* Last Updated */}
            <div className="text-xs text-gray-500 shrink-0">
                Last updated: {lastUpdated}
            </div>

            {/* Gold Rates */}
            <div className="flex items-center space-x-6 shrink-0">
                <div className="flex items-center">
                    <span className="font-semibold text-yellow-600">Gold</span>
                    {renderPriceChange(rates.gold.change, rates.gold.change_percentage)}
                </div>
                <div className="flex items-center space-x-4 text-sm">
                    <div>
                        <span className="text-gray-500">24K:</span>
                        <span className="ml-1 font-medium">₹{rates.gold.price_24k ? rates.gold.price_24k.toFixed(2) : 'N/A'}/g</span>
                    </div>
                    <div>
                        <span className="text-gray-500">22K:</span>
                        <span className="ml-1 font-medium">₹{rates.gold.price_22k ? rates.gold.price_22k.toFixed(2) : 'N/A'}/g</span>
                    </div>
                    <div>
                        <span className="text-gray-500">18K:</span>
                        <span className="ml-1 font-medium">₹{rates.gold.price_18k ? rates.gold.price_18k.toFixed(2) : 'N/A'}/g</span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="h-4 w-px bg-gray-300 shrink-0"></div>

            {/* Silver Rates */}
            <div className="flex items-center space-x-6 shrink-0">
                <div className="flex items-center">
                    <span className="font-semibold text-gray-400">Silver</span>
                    {renderPriceChange(rates.silver.change, rates.silver.change_percentage)}
                </div>
                <div className="text-sm">
                    <span className="text-gray-500">Price:</span>
                    <span className="ml-1 font-medium">₹{rates.silver.price ? rates.silver.price.toFixed(2) : 'N/A'}/g</span>
                </div>
            </div>
        </div>
    );
}