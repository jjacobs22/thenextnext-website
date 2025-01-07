import { QueryClient } from "@tanstack/react-query";

// Define base API URL based on environment
const API_BASE = import.meta.env.DEV 
  ? "" // Use relative paths in development
  : '/thenextnext-website/api'; // GitHub Pages path

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const path = queryKey[0] as string;
        const url = path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;

        try {
          const res = await fetch(url, {
            headers: {
              'Accept': 'application/json',
            },
          });

          if (!res.ok) {
            console.error(`API Error: ${res.status} ${res.statusText}`);
            if (res.status >= 500) {
              throw new Error(`Server Error: ${res.status}`);
            }
            throw new Error(`API Error: ${await res.text()}`);
          }

          return res.json();
        } catch (error) {
          console.error('API Request failed:', error);
          throw error;
        }
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    }
  },
});