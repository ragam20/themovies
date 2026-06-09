import { api } from "@/lib/api-client";
import { maxRetry } from "@/lib/react-query";
import { ApiBaseList } from "@/types/common";
import { TVShowList } from "@/types/tv";
import { useQuery } from "@tanstack/react-query";

type GetOnTheAirInput = {
  page: number;
  minDate: string;
  maxDate: string;
};

export const getOnTheAir = async ({
  page,
  maxDate,
  minDate,
}: GetOnTheAirInput) => {
  const resp = await api.get<ApiBaseList<TVShowList>>(
    `/tv/on_the_air?language=en-US&page=${page}&air_date.lte=${maxDate}&air_date.gte=${minDate}`,
  );
  return resp.results;
};

export const useGetOnTheAir = (input: GetOnTheAirInput) => {
  return useQuery<TVShowList[], Error>({
    retry: maxRetry,
    queryKey: ["tv", "on_the_air", input.page, input.minDate, input.maxDate],
    queryFn: () => getOnTheAir(input),
  });
};
