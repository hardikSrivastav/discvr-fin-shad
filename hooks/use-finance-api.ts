import * as React from "react";
import * as api from '@/lib/api';

// Add immediate console log for debugging
console.log("🔥 useFinanceApi hooks module is being loaded");

type ApiFunction<T, P extends any[]> = (...args: P) => Promise<T>;
type UseApiResult<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: () => void;
};

/**
 * Generic hook for making API calls
 * @param apiFn The API function to call
 * @param args Arguments to pass to the API function
 * @returns Object containing data, error, loading state, and refetch function
 */
export function useApi<T, P extends any[]>(
  apiFn: ApiFunction<T, P>,
  ...args: P
): UseApiResult<T> {
  // Create a readable function name for logging
  const funcName = apiFn.name || 'unknown';
  const hookId = React.useId();
  
  console.log(`⚓ useApi initialized: ${funcName} [${hookId}]`, { args });
  
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [trigger, setTrigger] = React.useState<number>(0);

  const refetch = () => {
    console.log(`🔄 Refetching data: ${funcName} [${hookId}]`);
    setTrigger((t: number) => t + 1);
  }

  React.useEffect(() => {
    let isMounted = true;
    console.log(`🚀 useApi effect triggered: ${funcName} [${hookId}]`, { args, trigger });
    setLoading(true);

    const fetchData = async () => {
      const startTime = performance.now();
      try {
        console.log(`📡 Fetching data: ${funcName} [${hookId}]`, { args });
        const result = await apiFn(...args);
        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2);
        
        if (isMounted) {
          console.log(`✅ Data fetched successfully: ${funcName} [${hookId}] (${duration}ms)`, {
            dataSize: Array.isArray(result) ? result.length : 'object',
          });
          setData(result);
          setError(null);
        }
      } catch (err) {
        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2);
        
        if (isMounted) {
          console.error(`❌ Error fetching data: ${funcName} [${hookId}] (${duration}ms)`, { error: err });
          setError(err instanceof Error ? err : new Error(String(err)));
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      console.log(`♻️ Cleaning up useApi effect: ${funcName} [${hookId}]`);
      isMounted = false;
    };
  }, [trigger, ...args]);

  return { data, error, loading, refetch };
}

// Specific hooks for each API endpoint

export function useEquitySpotlight() {
  console.log("📊 useEquitySpotlight hook called");
  return useApi(api.getEquitySpotlight);
}

export function useStockNews(symbol?: string, limit?: number) {
  console.log("📰 useStockNews hook called", { symbol, limit });
  return useApi(api.getStockNews, symbol, limit);
}

export function usePressReleases(symbol?: string, limit?: number) {
  console.log("📣 usePressReleases hook called", { symbol, limit });
  return useApi(api.getPressReleases, symbol, limit);
}

export function useEarningsResults(
  symbol?: string,
  fromDate?: string,
  toDate?: string,
  limit?: number
) {
  console.log("💰 useEarningsResults hook called", { symbol, fromDate, toDate, limit });
  return useApi(api.getEarningsResults, symbol, fromDate, toDate, limit);
}

export function useCryptoNews(limit?: number) {
  console.log("🪙 useCryptoNews hook called", { limit });
  return useApi(api.getCryptoNews, limit);
}

export function useNewsDashboard(symbol?: string, limit?: number) {
  console.log("📑 useNewsDashboard hook called", { symbol, limit });
  return useApi(api.getNewsDashboard, symbol, limit);
}

export function useMarketIndices(limit?: number) {
  console.log("📈 useMarketIndices hook called", { limit });
  return useApi(api.getMarketIndices, limit);
} 