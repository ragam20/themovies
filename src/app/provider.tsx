"use client";

import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { queryConfig } from "@/lib/react-query";
import { MainErrorFallback } from "@/components/errors/main";
import { isProduction } from "@/lib/utils";
import { publicEnv } from "@/config/public-env";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(() => {
    return new QueryClient({ defaultOptions: queryConfig });
  });

  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {!isProduction(publicEnv.ENV) && <ReactQueryDevtools />}
        {children}
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
