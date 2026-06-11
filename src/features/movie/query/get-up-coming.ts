"use client";

import { queryOptions, useQuery } from "@tanstack/react-query";
import { MovieListFilterInput } from "./get-movie-list";
import { maxRetry } from "@/lib/react-query";

export const fetchUpComing = async (input: MovieListFilterInput) => {
  const params = new URLSearchParams({
    page: String(input.page),
  });

  if (input.minDate) {
    params.append("minDate", input.minDate);
  }

  if (input.maxDate) {
    params.append("maxDate", input.maxDate);
  }

  return fetch(`/api/movie/list/up-coming?${params.toString()}`).then((r) =>
    r.json(),
  );
};

export const getUpComingQueryOptions = (input: MovieListFilterInput) => {
  return queryOptions({
    retry: maxRetry,
    queryKey: [
      "movie",
      "upcoming",
      input.page,
      input.minDate,
      input.maxDate,
    ] as const,
    queryFn: () => fetchUpComing(input),
  });
};

export const useUpComing = (input: MovieListFilterInput) => {
  return useQuery(getUpComingQueryOptions(input));
};
