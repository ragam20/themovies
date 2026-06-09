import { privateEnv } from "@/config/private-env";
import { publicEnv } from "@/config/public-env";

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  // body?: any;
  // cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

function buildUrl(path: string, params?: RequestOptions["params"]) {
  const url = new URL(`${publicEnv.TMDB_BASE_URL}${path}`);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

export async function fetchApi<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { headers, params, cache = "force-cache", next } = options;

  const response = await fetch(buildUrl(path, params), {
    headers: {
      Authorization: `Bearer ${privateEnv.TMDB_ACCESS_TOKEN}`,
      Accept: "application/json",
      ...headers,
    },
    cache,
    next,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "GET" });
  },
  // post<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
  //   return fetchApi<T>(url, { ...options, method: "POST", body });
  // },
  // put<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
  //   return fetchApi<T>(url, { ...options, method: "PUT", body });
  // },
  // patch<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
  //   return fetchApi<T>(url, { ...options, method: "PATCH", body });
  // },
  // delete<T>(url: string, options?: RequestOptions): Promise<T> {
  //   return fetchApi<T>(url, { ...options, method: "DELETE" });
  // },
};
