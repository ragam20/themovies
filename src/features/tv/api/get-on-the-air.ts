import { api } from "@/lib/api-client";
import { ApiBaseList } from "@/types/common";
import { TVShowList } from "@/types/tv";

type GetOnTheAirInput = {
  page: number;
  minDate?: string;
  maxDate?: string;
};

export const getOnTheAir = async ({
  page,
  minDate,
  maxDate,
}: GetOnTheAirInput) => {
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
    `/tv/on_the_air?${params.toString()}`,
  );

  return resp;
};
