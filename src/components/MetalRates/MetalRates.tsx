import React, { useEffect, useState } from 'react';

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
                        <span className="ml-1 font-medium">₹{rates.gold.price_24k.toFixed(2)}/g</span>
                    </div>
                    <div>
                        <span className="text-gray-500">22K:</span>
                        <span className="ml-1 font-medium">₹{rates.gold.price_22k.toFixed(2)}/g</span>
                    </div>
                    <div>
                        <span className="text-gray-500">18K:</span>
                        <span className="ml-1 font-medium">₹{rates.gold.price_18k.toFixed(2)}/g</span>
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
                    <span className="ml-1 font-medium">₹{rates.silver.price.toFixed(2)}/g</span>
                </div>
            </div>
        </div>
    );
} 