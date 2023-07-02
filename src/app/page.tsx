import { useState } from "react";

import Navbar from "@/components/layout/navbar";
import getQueryClient from "@/lib/get-query-client";
import { Hydrate } from "@/lib/hydrate";
import { tmdbMovie, tmdbResponse } from "@/types/tmdb";
import { Movie } from "@prisma/client";
import { dehydrate } from "@tanstack/react-query";

import Hero from "./(sections)/hero";
import NowPlaying from "./(sections)/now-playing";

async function getMovies() {
  const movies: Movie[] = await fetch(
    "https://seleksi-sea-2023.vercel.app/api/movies"
  ).then((res) => res.json());
  return movies
}

async function getMovieByTitle(title: string) {
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

  if (!res.results) {
    return null
  }

  return res.results[0]
}


export default async function Home() {
  const nowPlaying = await getMovies()
  const random = Math.floor(Math.random() * nowPlaying.length)
  const featured = nowPlaying[random]
  const featuredBackdrop = await getMovieByTitle(featured.title).then((res) => {
    if (res === null) return featured.poster_url
    return res.backdrop_path
  })

  return (
    <>
      <Navbar />
      <Hero movie={featured} backdrop={featuredBackdrop} />
      <NowPlaying movies={nowPlaying} />
    </>
  )
}
