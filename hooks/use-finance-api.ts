import * as React from "react";
import * as api from '@/lib/api';

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
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [trigger, setTrigger] = React.useState<number>(0);

  const refetch = () => setTrigger((t: number) => t + 1);

  React.useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const result = await apiFn(...args);
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
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
      isMounted = false;
    };
  }, [trigger, ...args]);

  return { data, error, loading, refetch };
}

// Specific hooks for each API endpoint

export function useEquitySpotlight() {
  return useApi(api.getEquitySpotlight);
}

export function useStockNews(symbol?: string, limit?: number) {
  return useApi(api.getStockNews, symbol, limit);
}

export function usePressReleases(symbol?: string, limit?: number) {
  return useApi(api.getPressReleases, symbol, limit);
}

export function useEarningsResults(
  symbol?: string,
  fromDate?: string,
  toDate?: string,
  limit?: number
) {
  return useApi(api.getEarningsResults, symbol, fromDate, toDate, limit);
}

export function useCryptoNews(limit?: number) {
  return useApi(api.getCryptoNews, limit);
}

export function useNewsDashboard(symbol?: string, limit?: number) {
  return useApi(api.getNewsDashboard, symbol, limit);
}

export function useMarketIndices(limit?: number) {
  return useApi(api.getMarketIndices, limit);
} 