import { api } from "@/lib/api-client";
import { maxRetry } from "@/lib/react-query";
import { MovieDetail } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

type GetMovieDetailInput = {
  id: number;
};

export const getMovieDetail = async ({ id }: GetMovieDetailInput) => {
  const resp = await api.get<MovieDetail>(`/movie/${id}?language=en-US`);
  return resp;
};

export const useGetMovieDetail = (input: GetMovieDetailInput) => {
  return useQuery<MovieDetail, Error>({
    retry: maxRetry,
    queryKey: ["movie", "detail", input.id],
    queryFn: () => getMovieDetail(input),
  });
};
