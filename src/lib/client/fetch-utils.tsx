"use client";

import { tmdbMovie, tmdbMovieDetails } from "@/types/tmdb";
import { Movie } from "@prisma/client";

export async function getMovieByTitleClient(title: string) {
  const data: { result: tmdbMovie } = await fetch(
    `/api/movies/title/${title}`
  ).then((res) => res.json());
  return data.result;
}

export async function getMoviesClient() {
  const movies: { result: Movie[] } = await fetch("/api/movies").then((res) =>
    res.json()
  );
  return movies.result;
}

export async function getMovieByIdClient(id: string) {
  const data: { result: tmdbMovieDetails } = await fetch(
    `/api/movies/${id}`
  ).then((res) => res.json());
  return data.result;
}
