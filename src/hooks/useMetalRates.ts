import { useState, useEffect } from 'react';
import { GoldPrices, SilverPrices, MetalRatesData, UseMetalRatesReturn } from '../types/metalRates.types';

const initialRates: MetalRatesData = {
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
};

export function useMetalRates(): UseMetalRatesReturn {
    const [rates, setRates] = useState<MetalRatesData>(initialRates);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<string>('');

    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true); // Set loading to true at the beginning of fetch
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
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
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
            } catch (error) {
                console.error('Error fetching metal rates:', error);
                // Potentially set an error state here to display in the UI
                setRates(initialRates); // Reset to initial or last known good rates if preferred
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
        // Refresh rates every 1 hour
        const interval = setInterval(fetchRates, 3600000); 
        return () => clearInterval(interval);
    }, []);

    return { rates, loading, lastUpdated };
}
