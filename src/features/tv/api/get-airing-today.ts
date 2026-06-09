import { api } from "@/lib/api-client";
import { maxRetry } from "@/lib/react-query";
import { ApiBaseList } from "@/types/common";
import { TVShowList } from "@/types/tv";
import { useQuery } from "@tanstack/react-query";

type GetAiringTodayInput = {
  page: number;
};

export const getAiringToday = async ({ page }: GetAiringTodayInput) => {
  const resp = await api.get<ApiBaseList<TVShowList>>(
    `/tv/airing_today?language=en-US&page=${page}`,
  );
  return resp.results;
};

export const useGetAiringToday = (input: GetAiringTodayInput) => {
  return useQuery<TVShowList[], Error>({
    retry: maxRetry,
    queryKey: ["tv", "airing_today", input.page],
    queryFn: () => getAiringToday(input),
  });
};
