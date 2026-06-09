import { api } from "@/lib/api-client";
import { maxRetry } from "@/lib/react-query";
import { ApiBaseList } from "@/types/common";
import { MovieList } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

type UpComingInput = {
  page: number;
  minDate: string;
  maxDate: string;
};

export const upcoming = async ({ page, minDate, maxDate }: UpComingInput) => {
  const resp = await api.get<ApiBaseList<MovieList>>(
    `/movie/upcoming?language=en-US&page=${page}&release_date.gte=${minDate}&release_date.lte=${maxDate}`,
  );

  return resp.results;
};

export const useUpComing = (input: UpComingInput) => {
  return useQuery<MovieList[], Error>({
    retry: maxRetry,
    queryKey: ["movie", "upcoming", input.page, input.minDate, input.maxDate],
    queryFn: () => upcoming(input),
  });
};
