import Navbar from "@/components/layout/navbar";
import { Movie } from "@prisma/client";

import Hero from "./(sections)/hero";
import NowPlaying from "./(sections)/now-playing";

interface tmdbResponse {
  page: number,
  results: tmdbMovieType[],
  total_pages: number,
  total_results: number
}
interface tmdbMovieType {
  "adult": boolean,
  "backdrop_path": string,
  "genre_ids": number[],
  "id": number,
  "original_language": string,
  "original_title": string,
  "overview": string,
  "popularity": number,
  "poster_path": string,
  "release_date": string,
  "title": string,
  "video": boolean,
  "vote_average": number,
  "vote_count": number
}

async function getMovies() {
  const movies = await fetch(
    "https://seleksi-sea-2023.vercel.app/api/movies"
  ).then((res) => res.json());
  return movies
}

async function getMovieByTitle(title: string): Promise<tmdbResponse> {
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
  const random = Math.floor((Math.random() * (movies.length - 1)))
  const movie = movies[random]
  const featuredMovie = await getMovieByTitle(movie.title)

  return (
    <>
      <Navbar />
      <Hero movie={movie} tmdbMovieAPI={featuredMovie} />
      <NowPlaying movies={movies} />
    </>
  )
}
