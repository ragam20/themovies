import { api } from "@/lib/api-client";
import { Credits } from "@/types/tv";

export const getCredits = async (tvId: string | number) => {
  const resp = await api.get<Credits>(`/tv/${tvId}/credits?language=en-US`);
  return resp.cast;
};
