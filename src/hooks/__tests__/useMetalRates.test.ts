import { renderHook, act } from '@testing-library/react-hooks';
import { useMetalRates } from '../useMetalRates'; // Adjust path as necessary

// Mock global fetch
global.fetch = jest.fn();

const mockSuccessfulResponse = {
    data: {
        metal_prices: {
            XAU: {
                price_24k: 50000,
                price_22k: 48000,
                price_18k: 40000,
                change: 100,
                change_percentage: 0.2,
            },
            XAG: {
                price: 700,
                change: -5,
                change_percentage: -0.71,
            },
        },
    },
};

const initialRatesData = {
    gold: { price_24k: 0, price_22k: 0, price_18k: 0, change: 0, change_percentage: 0 },
    silver: { price: 0, change: 0, change_percentage: 0 },
};

describe('useMetalRates Hook', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        (fetch as jest.Mock).mockClear();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should set loading to true initially and false after fetching', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockSuccessfulResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useMetalRates());

        expect(result.current.loading).toBe(true);
        
        await act(async () => {
            await waitForNextUpdate(); // Wait for the fetch and subsequent state updates
        });
        
        expect(result.current.loading).toBe(false);
    });

    it('should correctly parse and set rates from a successful API response', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockSuccessfulResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useMetalRates());

        await act(async () => {
            await waitForNextUpdate();
        });
        
        expect(result.current.rates.gold.price_24k).toBe(50000);
        expect(result.current.rates.silver.price).toBe(700);
        expect(result.current.loading).toBe(false);
    });

    it('should set the lastUpdated string after a successful fetch', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockSuccessfulResponse,
        });
        
        const { result, waitForNextUpdate } = renderHook(() => useMetalRates());
        
        await act(async () => {
            await waitForNextUpdate();
        });

        expect(result.current.lastUpdated).not.toBe('');
        // We can't easily test the exact time string, but we can check it's populated.
        expect(result.current.lastUpdated.length).toBeGreaterThan(0); 
    });

    it('should keep initial rates and set loading to false on API error', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

        const { result, waitForNextUpdate } = renderHook(() => useMetalRates());
        
        // The hook sets loading to true initially
        expect(result.current.loading).toBe(true);

        await act(async () => {
          // Wait for the useEffect to complete its execution, including the catch block
          // For hooks that set loading false in a finally block, this might involve waiting for promises.
          // If there's an explicit state update in catch, waitForNextUpdate might work.
          // Given the structure, we expect loading to become false even on error.
           await waitForNextUpdate(); 
        });
        
        expect(result.current.rates).toEqual(initialRatesData);
        expect(result.current.loading).toBe(false);
        // Optionally, check console.error was called if you wrap it or use a spy
    });
    
    it('should call fetch again after the interval', async () => {
        (fetch as jest.Mock).mockResolvedValue({ // Mock it twice for initial and interval call
            ok: true,
            json: async () => mockSuccessfulResponse,
        });

        const { waitForNextUpdate } = renderHook(() => useMetalRates());
        
        await act(async () => {
            await waitForNextUpdate(); // Initial fetch
        });
        expect(fetch).toHaveBeenCalledTimes(1);

        // Advance timers by 1 hour (3600000 ms)
        await act(async () => {
            jest.advanceTimersByTime(3600000);
        });
        
        // await waitForNextUpdate(); // Wait for the state update from the interval fetch
        // RTL hooks' waitForNextUpdate might not be strictly necessary here if we're just checking fetch calls
        // and not further state changes from the second fetch, but it's good practice if state would change.

        expect(fetch).toHaveBeenCalledTimes(2); // Fetch should be called again
    });
});
