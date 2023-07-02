declare module "tmdb";
export interface tmdbResponse {
  page: number;
  results: tmdbMovie[];
  total_pages: number;
  total_results: number;
}

export interface tmdbMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface tmdbGenre {
  id: number;
  name: string;
}

export interface tmdbProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface tmdbProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface tmdbSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
export interface tmdbMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | unknown;
  budget: number;
  genres: tmdbGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: tmdbProductionCompany[];
  production_countries: tmdbProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: tmdbSpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
