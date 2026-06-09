import { api } from "@/lib/api-client";
import { maxRetry } from "@/lib/react-query";
import { ApiBaseList } from "@/types/common";
import { TVShowList } from "@/types/tv";
import { useQuery } from "@tanstack/react-query";

type GetPopularInput = {
  page: number;
};

export const getPopular = async ({ page }: GetPopularInput) => {
  const resp = await api.get<ApiBaseList<TVShowList>>(
    `/tv/popular?language=en-US&page=${page}`,
  );

  return resp.results;
};

export const useGetPopular = (input: GetPopularInput) => {
  return useQuery<TVShowList[], Error>({
    retry: maxRetry,
    queryKey: ["tv", "popular", input.page],
    queryFn: () => getPopular(input),
  });
};
