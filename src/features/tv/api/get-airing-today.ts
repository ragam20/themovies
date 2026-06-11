import { api } from "@/lib/api-client";
import { ApiBaseList } from "@/types/common";
import { TVShowList } from "@/types/tv";

type GetAiringTodayInput = {
  page: number;
  minDate?: string;
  maxDate?: string;
};

export const getAiringToday = async ({
  page,
  minDate,
  maxDate,
}: GetAiringTodayInput) => {
  const params = new URLSearchParams({
    language: "en-US",
    page: String(page),
  });

  if (minDate) {
    params.append("air_date.gte", minDate);

    if (maxDate) {
      params.append("air_date.lte", maxDate);
    }
  }

  const resp = await api.get<ApiBaseList<TVShowList>>(
    `/tv/airing_today?${params.toString()}`,
  );

  return resp;
};
