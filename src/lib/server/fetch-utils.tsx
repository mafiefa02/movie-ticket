import { tmdbMovie, tmdbMovieDetails, tmdbResponse } from "@/types/tmdb";
import { Movie } from "@prisma/client";

export async function getMovieByTitleServer(title: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };
  const res: tmdbResponse = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${title}`,
    options
  ).then((res) => res.json());

  if (res.results === undefined || res.results.length === 0) {
    return null;
  }

  return res.results[0] as tmdbMovie;
}

export async function getMoviesServer() {
  const movies: Movie[] = await fetch(
    "https://seleksi-sea-2023.vercel.app/api/movies"
  ).then((res) => res.json());
  return movies;
}

export async function getMovieByIdServer(id: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  const res = await fetch(
    "https://api.themoviedb.org/3/movie/" + id,
    options
  ).then((res) => res.json());

  return res as tmdbMovieDetails;
}
