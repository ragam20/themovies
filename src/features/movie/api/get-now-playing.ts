import { api } from "@/lib/api-client";
import { ApiBaseList } from "@/types/common";
import { MovieList } from "@/types/movie";

export type GetNowPlayingInput = {
  page: number;
  maxDate?: string;
  minDate?: string;
};
export const getNowPlaying = async ({
  page,
  minDate,
  maxDate,
}: GetNowPlayingInput) => {
  const params = new URLSearchParams({
    page: page.toString(),
  });

  if (minDate) {
    params.append("release_date.gte", minDate);
  }

  if (maxDate) {
    params.append("release_date.lte", maxDate);
  }

  const resp = await api.get<ApiBaseList<MovieList>>(
    `/movie/now_playing?${params.toString()}`,
  );

  return resp;
};
