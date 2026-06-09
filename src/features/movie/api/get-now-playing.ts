import { api } from "@/lib/api-client";
import { maxRetry } from "@/lib/react-query";
import { ApiBaseList } from "@/types/common";
import { MovieList } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

type GetNowPlayingInput = {
  page: number;
  maxDate: string;
  minDate: string;
};

export const getNowPlaying = async ({
  page,
  minDate,
  maxDate,
}: GetNowPlayingInput): Promise<MovieList[]> => {
  const resp = await api.get<ApiBaseList<MovieList>>(
    `/movie/now_playing?page=${page}&release_date.gte=${minDate}&release_date.lte=${maxDate}`,
  );

  return resp.results;
};

export const useGetNowPlaying = (input: GetNowPlayingInput) => {
  return useQuery<MovieList[], Error>({
    retry: maxRetry,
    queryKey: [
      "movie",
      "now_playing",
      input.page,
      input.minDate,
      input.maxDate,
    ],
    queryFn: () => getNowPlaying(input),
  });
};
