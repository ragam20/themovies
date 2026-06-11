"use client";

import { queryOptions, useQuery } from "@tanstack/react-query";
import { TVListFilterInput } from "./get-tv-list";
import { maxRetry } from "@/lib/react-query";

export const fetchPopular = async (input: TVListFilterInput) => {
  const params = new URLSearchParams({
    page: String(input.page),
  });

  if (input.minDate) {
    params.append("minDate", input.minDate);
  }

  if (input.maxDate) {
    params.append("maxDate", input.maxDate);
  }

  return fetch(`/api/tv/list/popular?${params.toString()}`).then((r) =>
    r.json(),
  );
};

export const getPopularOptions = (input: TVListFilterInput) => {
  return queryOptions({
    retry: maxRetry,
    queryKey: ["tv", "popular", input.page, input.minDate, input.maxDate],
    queryFn: () => fetchPopular(input),
  });
};

export const useGetPopular = (input: TVListFilterInput) => {
  return useQuery(getPopularOptions(input));
};
