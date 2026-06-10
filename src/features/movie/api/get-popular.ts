import { api } from "@/lib/api-client";
import { maxRetry } from "@/lib/react-query";
import { ApiBaseList } from "@/types/common";
import { MovieList } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

type GetPopularInput = {
  page: number;
};
export const getPopular = async ({ page }: GetPopularInput) => {
  const resp = await api.get<ApiBaseList<MovieList>>(
    `/movie/popular?language=en-US&page=${page}`,
  );
  return resp.results;
};

export const useGetPopular = (input: GetPopularInput) => {
  return useQuery<MovieList[], Error>({
    retry: maxRetry,
    queryKey: ["movie", "popular", input.page],
    queryFn: () => getPopular(input),
  });
};
