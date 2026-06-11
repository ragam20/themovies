import { queryOptions, useQuery } from "@tanstack/react-query";
import { MovieListFilterInput } from "./get-movie-list";
import { maxRetry } from "@/lib/react-query";

export const fetchPopular = async (input: MovieListFilterInput) => {
  const params = new URLSearchParams({
    page: String(input.page),
  });

  if (input.minDate) {
    params.append("minDate", input.minDate);
  }

  if (input.maxDate) {
    params.append("maxDate", input.maxDate);
  }

  return fetch(`/api/movie/list/popular?${params.toString()}`).then((r) =>
    r.json(),
  );
};

export const getPopularQueryOptions = (input: MovieListFilterInput) => {
  return queryOptions({
    retry: maxRetry,
    queryKey: [
      "movie",
      "popular",
      input.page,
      input.minDate,
      input.maxDate,
    ] as const,
    queryFn: () => fetchPopular(input),
  });
};

export const useGetPopular = (input: MovieListFilterInput) => {
  return useQuery(getPopularQueryOptions(input));
};
