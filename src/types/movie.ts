import type { ApiBaseList, MediaDetailCommon, MediaListCommon } from "./common";

export interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface MovieList extends MediaListCommon {
  original_title: string;
  poster_path: string;
  title: string;
}

export type MovieListResponse = ApiBaseList<MovieList>;

export interface MovieDetail extends MediaDetailCommon {
  belongs_to_collection: Collection | null;
  budget: number;
  imdb_id: string | null;
  original_title: string;
  release_date: string;
  revenue: number;
  runtime: number | null;
  title: string;
  video: boolean;
}
