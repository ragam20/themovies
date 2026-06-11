import { maxRetry } from "@/lib/react-query";
import { queryOptions } from "@tanstack/react-query";
import { fetchNowPlaying } from "./get-now-playing";
import { fetchPopular } from "./get-popular";
import { fetchUpComing } from "./get-up-coming";

export const movieListMap = {
  now_playing: {
    slug: "now-playing",
    title: "Now Playing",
  },
  popular: {
    slug: "popular",
    title: "Popular",
  },
  up_coming: {
    slug: "up-coming",
    title: "Up Coming",
  },
} as const;

export type MovieListKey = keyof typeof movieListMap;

export type MovieListFilterInput = {
  page: number;
  minDate?: string;
  maxDate?: string;
};

export const getMovieListKeyBySlug = (slug: string) => {
  const key = slug.replaceAll("-", "_") as MovieListKey;
  return key in movieListMap ? key : undefined;
};

export const getMovieListQueryOptions = (
  key: MovieListKey,
  filter: MovieListFilterInput,
) => {
  return queryOptions({
    retry: maxRetry,
    queryKey: [
      "movie",
      "list",
      key,
      filter.page,
      filter.minDate,
      filter.maxDate,
    ] as const,
    queryFn: () => {
      switch (key) {
        case "now_playing":
          return fetchNowPlaying(filter);
        case "popular":
          return fetchPopular(filter);
        case "up_coming":
          return fetchUpComing(filter);
      }
    },
  });
};
