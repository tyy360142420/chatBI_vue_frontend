import { useEventSource } from "@vueuse/core";

export function useSource(url: string, options: any) {
  const baseURL = import.meta.env.VITE_APP_API_BASE_URL;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
  }
  options.headers = {
    ...headers,
    ...options.headers,
  };
  return useEventSource(baseURL + url, options);
}
