import { api } from "@/lib/api-client";
import { ApiBaseList } from "@/types/common";
import { MovieList } from "@/types/movie";

export type GetPopularInput = {
  page: number;
  minDate?: string;
  maxDate?: string;
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
    params.append("release_date.gte", minDate);
  }

  if (maxDate) {
    params.append("release_date.lte", maxDate);
  }

  const resp = await api.get<ApiBaseList<MovieList>>(
    `/movie/popular?${params.toString()}`,
  );

  return resp;
};
