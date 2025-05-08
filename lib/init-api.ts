import { setApiUrl } from "./api";

let initialized = false;

/**
 * Initialize the API URL - safe to call multiple times, will only set URL once
 */
export const initializeApi = () => {
  if (initialized) {
    return;
  }

  // Only run on client-side
  if (typeof window !== 'undefined') {
    console.log('🌐 Initializing API in init-api.ts');
    setApiUrl(process.env.NEXT_PUBLIC_API_URL || 'https://7t4gvcwd-8008.inc1.devtunnels.ms/api/v1');
    initialized = true;
  }
};

// Auto-initialize when this module is imported
initializeApi();

// Export for explicit initialization if needed
export default initializeApi; 