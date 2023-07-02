import Navbar from "@/components/layout/navbar";
import { Movie } from "@prisma/client";

import Hero from "./(sections)/hero";
import NowPlaying from "./(sections)/now-playing";

async function getMovies() {
  const movies = await fetch(
    "https://seleksi-sea-2023.vercel.app/api/movies"
  ).then((res) => res.json());
  return movies
}

async function getMovieByTitle(title: string) {
  const titleURL = title.replace(" ", "%20").replace("&", "%26");
  const movieBackdrop = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${titleURL}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
  }
  ).then((res) => res.json());

  return movieBackdrop
}


export default async function Home() {
  const movies: Movie[] = await getMovies()
  const random = Math.floor((Math.random() * movies.length))
  const movie = movies[random]
  const featuredMovie = await getMovieByTitle(movie.title)
  const backdrop = featuredMovie.results[0].backdrop_path as string

  return (
    <>
      <Navbar />
      <Hero movie={movie} backdrop={backdrop} />
      <NowPlaying movies={movies} />
    </>
  )
}
