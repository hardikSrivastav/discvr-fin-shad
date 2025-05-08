// API service for fetching financial data
// The base URL will be provided as an environment variable API_URL

// Define types based on the API response structures
export interface MarketMover {
  ticker: string;
  name: string;
  price: number;
  change: number;
  volume: string;
}

export interface MarketStats {
  total_stocks: number;
  gainers_count: number;
  losers_count: number;
  active_count: number;
  average_gain: number;
  average_loss: number;
  max_gain: number;
  max_loss: number;
  average_volume: number;
  max_volume: number;
  advance_decline_ratio: number;
  top_performing_sectors: string[];
}

export interface EquitySpotlight {
  top_gainers: MarketMover[];
  top_losers: MarketMover[];
  most_active: MarketMover[];
  market_stats: MarketStats;
  last_updated: string;
}

export interface NewsItem {
  title: string;
  text: string;
  url: string;
  publication_date: string;
  source: string;
}

export interface PressRelease {
  title: string;
  content: string;
  date: string;
  url: string;
}

export interface EarningsResult {
  symbol: string;
  date: string;
  eps: number;
  estimated_eps: number;
  revenue: number;
  estimated_revenue: number;
  name?: string;
}

export interface MarketIndex {
  name: string;
  symbol: string;
  price: number;
  change: number;
  change_percent: number;
  volume: number;
}

export interface NewsDashboard {
  general_news: NewsItem[];
  stock_news: NewsItem[];
  crypto_news: NewsItem[];
  press_releases: PressRelease[];
}

// API base URL - this will be set externally
let API_URL = '';

// Set API URL programmatically (to be called when the app initializes)
export const setApiUrl = (url: string) => {
  API_URL = url;
};

// Helper function for API calls
const fetchFromApi = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
  if (!API_URL) {
    console.warn('API_URL not set. Use setApiUrl() to configure the API endpoint.');
  }
  
  const url = new URL(`${API_URL}/finance/${endpoint}`);
  
  // Add query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

// API functions corresponding to the endpoints

/**
 * Get equity spotlight data including top gainers, losers, and market statistics
 */
export const getEquitySpotlight = async (): Promise<EquitySpotlight> => {
  return fetchFromApi<EquitySpotlight>('equity-spotlight');
};

/**
 * Get stock news
 * @param symbol Optional stock symbol
 * @param limit Optional maximum number of news items
 */
export const getStockNews = async (symbol?: string, limit?: number): Promise<NewsItem[]> => {
  const params: Record<string, string> = {};
  if (symbol) params.symbol = symbol;
  if (limit) params.limit = limit.toString();
  
  return fetchFromApi<NewsItem[]>('stock-news', params);
};

/**
 * Get company press releases
 * @param symbol Optional stock symbol
 * @param limit Optional maximum number of releases
 */
export const getPressReleases = async (symbol?: string, limit?: number): Promise<PressRelease[]> => {
  const params: Record<string, string> = {};
  if (symbol) params.symbol = symbol;
  if (limit) params.limit = limit.toString();
  
  return fetchFromApi<PressRelease[]>('press-releases', params);
};

/**
 * Get earnings results
 * @param symbol Optional stock symbol
 * @param fromDate Optional start date (YYYY-MM-DD)
 * @param toDate Optional end date (YYYY-MM-DD)
 * @param limit Optional maximum number of results
 */
export const getEarningsResults = async (
  symbol?: string,
  fromDate?: string,
  toDate?: string,
  limit?: number
): Promise<EarningsResult[]> => {
  const params: Record<string, string> = {};
  if (symbol) params.symbol = symbol;
  if (fromDate) params.from_date = fromDate;
  if (toDate) params.to_date = toDate;
  if (limit) params.limit = limit.toString();
  
  return fetchFromApi<EarningsResult[]>('earnings-results', params);
};

/**
 * Get cryptocurrency news
 * @param limit Optional maximum number of news items
 */
export const getCryptoNews = async (limit?: number): Promise<NewsItem[]> => {
  const params: Record<string, string> = {};
  if (limit) params.limit = limit.toString();
  
  return fetchFromApi<NewsItem[]>('crypto-news', params);
};

/**
 * Get comprehensive news dashboard
 * @param symbol Optional stock symbol for stock-specific news
 * @param limit Optional maximum news items per category
 */
export const getNewsDashboard = async (symbol?: string, limit?: number): Promise<NewsDashboard> => {
  const params: Record<string, string> = {};
  if (symbol) params.symbol = symbol;
  if (limit) params.limit = limit.toString();
  
  return fetchFromApi<NewsDashboard>('news-dashboard', params);
};

/**
 * Get data for major market indices
 * @param limit Optional maximum number of indices
 */
export const getMarketIndices = async (limit?: number): Promise<MarketIndex[]> => {
  const params: Record<string, string> = {};
  if (limit) params.limit = limit.toString();
  
  return fetchFromApi<MarketIndex[]>('market-indices', params);
}; 