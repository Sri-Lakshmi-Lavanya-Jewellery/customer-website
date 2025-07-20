import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Clock, Crown, Gem } from 'lucide-react';

interface GoldPrices {
    price_24k: number;
    price_22k: number;
    price_18k: number;
    change: number;
    change_percentage: number;
}

interface SilverPrices {
    price: number;
    change: number;
    change_percentage: number;
}

interface MetalRates {
    gold: GoldPrices;
    silver: SilverPrices;
}

export default function MetalRates() {
    const [rates, setRates] = useState<MetalRates>({
        gold: {
            price_24k: 0,
            price_22k: 0,
            price_18k: 0,
            change: 0,
            change_percentage: 0
        },
        silver: {
            price: 0,
            change: 0,
            change_percentage: 0
        }
    });
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<string>('');

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("x-api-key", "sk_4024Ab155D400078f102Fd4485Eadec7884a3acA86Ea67Ca");

                const requestOptions: RequestInit = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow" as RequestRedirect
                };

                const response = await fetch(
                    "https://gold.g.apised.com/v1/latest?metals=XAU,XAG&base_currency=INR&currencies=INR&weight_unit=gram",
                    requestOptions
                );
                const data = await response.json();
                
                setRates({
                    gold: {
                        price_24k: data.data.metal_prices.XAU.price_24k,
                        price_22k: data.data.metal_prices.XAU.price_22k,
                        price_18k: data.data.metal_prices.XAU.price_18k,
                        change: data.data.metal_prices.XAU.change,
                        change_percentage: data.data.metal_prices.XAU.change_percentage
                    },
                    silver: {
                        price: data.data.metal_prices.XAG.price,
                        change: data.data.metal_prices.XAG.change,
                        change_percentage: data.data.metal_prices.XAG.change_percentage
                    }
                });
                setLastUpdated(new Date().toLocaleTimeString());
                setLoading(false);
            } catch (error) {
                console.error('Error fetching metal rates:', error);
                setLoading(false);
            }
        };

        fetchRates();
        // Refresh rates every 1 hour to conserve API credits (24 calls per day = ~720 calls per month)
        const interval = setInterval(fetchRates, 3600000);
        return () => clearInterval(interval);
    }, []);

    const renderPriceChange = (change: number, changePercentage: number) => {
        const isPositive = change >= 0;
        const Icon = isPositive ? TrendingUp : TrendingDown;
        const colorClass = isPositive ? 'text-green-600' : 'text-red-600';
        const bgClass = isPositive ? 'bg-green-50' : 'bg-red-50';
        const sign = isPositive ? '+' : '';
        return (
            <span className={`${colorClass} ${bgClass} text-xs ml-2 px-2 py-1 rounded-full flex items-center gap-1 font-medium border ${isPositive ? 'border-green-200' : 'border-red-200'}`}>
                <Icon className="w-3 h-3" />
                {sign}{change.toFixed(2)} ({sign}{changePercentage.toFixed(2)}%)
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-2">
                <div className="flex items-center gap-2 text-gray-600">
                    <Crown className="w-4 h-4 animate-pulse" />
                    <span className="text-sm font-medium">Loading metal rates...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center space-x-6 px-4 py-2 overflow-x-auto">
            {/* Live Status Indicator */}
            <div className="flex items-center gap-2 shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-600 font-medium">Live Rates</span>
            </div>

            {/* Last Updated */}
            <div className="flex items-center gap-1 text-xs text-gray-500 shrink-0">
                <Clock className="w-3 h-3" />
                <span>Updated: {lastUpdated}</span>
            </div>

            {/* Gold Rates */}
            <div className="flex items-center space-x-4 shrink-0 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
                <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-600" />
                    <span className="font-bold text-yellow-700">Gold</span>
                    {renderPriceChange(rates.gold.change, rates.gold.change_percentage)}
                </div>
                <div className="flex items-center space-x-3 text-sm">
                    <div className="text-center">
                        <div className="text-xs text-yellow-600 font-medium">24K</div>
                        <div className="font-bold text-yellow-800">₹{rates.gold.price_24k.toFixed(0)}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-yellow-600 font-medium">22K</div>
                        <div className="font-bold text-yellow-800">₹{rates.gold.price_22k.toFixed(0)}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-yellow-600 font-medium">18K</div>
                        <div className="font-bold text-yellow-800">₹{rates.gold.price_18k.toFixed(0)}</div>
                    </div>
                </div>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center gap-1 shrink-0">
                <div className="h-6 w-0.5 bg-yellow-300 rounded-full"></div>
                <Gem className="w-3 h-3 text-gray-600" />
                <div className="h-6 w-0.5 bg-gray-300 rounded-full"></div>
            </div>

            {/* Silver Rates */}
            <div className="flex items-center space-x-4 shrink-0 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                <div className="flex items-center gap-2">
                    <Gem className="w-4 h-4 text-gray-600" />
                    <span className="font-bold text-gray-700">Silver</span>
                    {renderPriceChange(rates.silver.change, rates.silver.change_percentage)}
                </div>
                <div className="text-sm text-center">
                    <div className="text-xs text-gray-600 font-medium">Per Gram</div>
                    <div className="font-bold text-gray-800">₹{rates.silver.price.toFixed(0)}</div>
                </div>
            </div>

            {/* Quality Assurance Badge */}
            <div className="flex items-center gap-1 shrink-0 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                <Crown className="w-3 h-3 text-yellow-600" />
                <span className="text-xs font-medium text-gray-700">Certified Pure</span>
            </div>
        </div>
    );
} 