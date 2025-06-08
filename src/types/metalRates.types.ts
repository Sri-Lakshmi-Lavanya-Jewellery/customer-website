export interface GoldPrices {
    price_24k: number;
    price_22k: number;
    price_18k: number;
    change: number;
    change_percentage: number;
}

export interface SilverPrices {
    price: number;
    change: number;
    change_percentage: number;
}

export interface MetalRatesData {
    gold: GoldPrices;
    silver: SilverPrices;
}

// Type for the return value of the useMetalRates hook
export interface UseMetalRatesReturn {
    rates: MetalRatesData;
    loading: boolean;
    lastUpdated: string;
}
