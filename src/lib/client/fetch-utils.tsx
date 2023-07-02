"use client";

import { tmdbMovie } from "@/types/tmdb";
import { Movie } from "@prisma/client";

export async function getMovieByTitleClient(title: string) {
  const data: { result: tmdbMovie } = await fetch(`/api/movies/${title}`).then(
    (res) => res.json()
  );
  return data.result;
}

export async function getMoviesClient() {
  const movies: { result: Movie[] } = await fetch("/api/movies").then((res) =>
    res.json()
  );
  return movies.result;
}
