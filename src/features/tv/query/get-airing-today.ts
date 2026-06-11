"use client";

import { maxRetry } from "@/lib/react-query";
import { TVListFilterInput } from "./get-tv-list";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const fetchAiringToday = async (input: TVListFilterInput) => {
  const params = new URLSearchParams({
    page: String(input.page),
  });

  if (input.minDate) {
    params.append("minDate", input.minDate);
  }

  if (input.maxDate) {
    params.append("maxDate", input.maxDate);
  }

  return fetch(`/api/tv/list/airing-today?${params.toString()}`).then((r) =>
    r.json(),
  );
};

export const getAiringTodayOptions = (input: TVListFilterInput) => {
  return queryOptions({
    retry: maxRetry,
    queryKey: ["tv", "airing_today", input.page, input.minDate, input.maxDate],
    queryFn: () => fetchAiringToday(input),
  });
};

export const useGetAiringToday = (input: TVListFilterInput) => {
  return useQuery(getAiringTodayOptions(input));
};
