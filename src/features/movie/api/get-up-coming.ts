import { api } from "@/lib/api-client";
import { ApiBaseList } from "@/types/common";
import { MovieList } from "@/types/movie";

export type UpComingInput = {
  page: number;
  minDate?: string;
  maxDate?: string;
};
export const getUpComing = async ({
  page,
  minDate,
  maxDate,
}: UpComingInput) => {
  const params = new URLSearchParams({
    language: "en-US",
    page: page.toString(),
  });

  if (minDate) {
    params.append("release_date.gte", minDate);
  }

  if (maxDate) {
    params.append("release_date.lte", maxDate);
  }

  const resp = await api.get<ApiBaseList<MovieList>>(
    `/movie/upcoming?${params.toString()}`,
  );

  return resp;
};
