import { api } from "@/lib/api-client";
import { MovieCredits } from "@/types/movie";

export const getCredits = async (id: number | string) => {
  const resp = await api.get<MovieCredits>(
    `/movie/${id}/credits?language=en-US`,
  );

  return resp.cast;
};
