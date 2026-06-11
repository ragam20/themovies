import { api } from "@/lib/api-client";
import { ApiBaseList } from "@/types/common";
import { TVShowList } from "@/types/tv";

type GetPopularInput = {
  page: number;
  maxDate?: string;
  minDate?: string;
};
export const getPopular = async ({
  page,
  minDate,
  maxDate,
}: GetPopularInput) => {
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
    `/tv/popular?${params.toString()}`,
  );

  return resp;
};
