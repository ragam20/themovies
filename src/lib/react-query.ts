export const queryConfig = {
  queries: {
    // throwOnError: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
};

export function maxRetry(failureCount: number, error: any) {
  if (error.status === 401) {
    return false;
  }

  return failureCount < 2;
}
