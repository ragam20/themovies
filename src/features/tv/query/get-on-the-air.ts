"use client";

import { queryOptions, useQuery } from "@tanstack/react-query";
import { TVListFilterInput } from "./get-tv-list";
import { maxRetry } from "@/lib/react-query";

export const fetchOnTheAir = async (input: TVListFilterInput) => {
  const params = new URLSearchParams({
    page: String(input.page),
  });

  if (input.minDate) {
    params.append("minDate", input.minDate);
  }

  if (input.maxDate) {
    params.append("maxDate", input.maxDate);
  }

  return fetch(`/api/tv/list/on-the-air?${params.toString()}`).then((r) =>
    r.json(),
  );
};

export const getOnTheAirOptions = (input: TVListFilterInput) => {
  return queryOptions({
    retry: maxRetry,
    queryKey: ["tv", "popular", input.page, input.minDate, input.maxDate],
    queryFn: () => fetchOnTheAir(input),
  });
};

export const useGetOnTheAir = (input: TVListFilterInput) => {
  return useQuery(getOnTheAirOptions(input));
};
