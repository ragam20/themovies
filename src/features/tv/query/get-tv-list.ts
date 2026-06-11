import { maxRetry } from "@/lib/react-query";
import { queryOptions } from "@tanstack/react-query";
import { fetchAiringToday } from "./get-airing-today";
import { fetchPopular } from "./get-popular";
import { fetchOnTheAir } from "./get-on-the-air";

export const tvListMap = {
  airing_today: {
    slug: "airing-today",
    title: "Airing Today",
  },
  popular: {
    slug: "popular",
    title: "Popular",
  },
  on_the_air: {
    slug: "on-the-air",
    title: "On The Air",
  },
} as const;

export type TVListKey = keyof typeof tvListMap;

export type TVListFilterInput = {
  page: number;
  minDate?: string;
  maxDate?: string;
};

export const getTVListKeyBySlug = (slug: string) => {
  const key = slug.replaceAll("-", "_") as TVListKey;
  return key in tvListMap ? key : undefined;
};

export const getTVListQueryOptions = (
  key: TVListKey,
  filter: TVListFilterInput,
) => {
  return queryOptions({
    retry: maxRetry,
    queryKey: [
      "tv",
      "list",
      key,
      filter.page,
      filter.minDate,
      filter.maxDate,
    ] as const,
    queryFn: () => {
      switch (key) {
        case "airing_today":
          return fetchAiringToday(filter);
        case "popular":
          return fetchPopular(filter);
        case "on_the_air":
          return fetchOnTheAir(filter);
      }
    },
  });
};
