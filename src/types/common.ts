export type ApiError = {
  sucess: string;
  status_code: number;
  status_message: string;
};

export type ApiBaseList<T> = {
  dates?: Dates;
  page: number;
  results: T[];
  total_pages?: number;
  total_results?: number;
};

export type MediaListCommon = {
  id: string | number;
  backdrop_path: string;
  poster_path: string;
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  overview: string;
};

export interface Dates {
  maximum: string;
  minimum: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MediaDetailCommon {
  adult: boolean;
  backdrop_path: string | null;
  genres: Genre[];
  homepage: string;
  id: number;
  origin_country: string[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
}

export type Cast = {
  id: number;
  name: string;
  original_name: string;
  profile_path: string | null;
  character: string;
};
