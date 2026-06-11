"use client";

import { maxRetry } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { MovieListFilterInput } from "./get-movie-list";

export const fetchNowPlaying = async (input: MovieListFilterInput) => {
  const params = new URLSearchParams({
    page: String(input.page),
  });

  if (input.minDate) {
    params.append("minDate", input.minDate);
  }

  if (input.maxDate) {
    params.append("maxDate", input.maxDate);
  }

  return fetch(`/api/movie/list/now-playing?${params.toString()}`).then((r) =>
    r.json(),
  );
};

export const getNowPlayingQueryOptions = (input: MovieListFilterInput) => {
  return queryOptions({
    retry: maxRetry,
    queryKey: [
      "movie",
      "now_playing",
      input.page,
      input.minDate,
      input.maxDate,
    ] as const,
    queryFn: () => fetchNowPlaying(input),
  });
};

export const useGetNowPlaying = (input: MovieListFilterInput) => {
  return useQuery(getNowPlayingQueryOptions(input));
};
