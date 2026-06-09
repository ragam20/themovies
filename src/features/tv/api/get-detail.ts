import { api } from "@/lib/api-client";
import { maxRetry } from "@/lib/react-query";
import { TvDetail } from "@/types/tv";
import { useQuery } from "@tanstack/react-query";

type GetTvShowDetail = {
  id: number;
};

export const getTVShowDetail = async ({ id }: GetTvShowDetail) => {
  const resp = await api.get<TvDetail>(`/tv/${id}?language=en-US`);
  return resp;
};

export const useGetTVShowDetail = (input: GetTvShowDetail) => {
  return useQuery<TvDetail, Error>({
    retry: maxRetry,
    queryKey: ["tv", "detail", input.id],
    queryFn: () => getTVShowDetail(input),
  });
};
