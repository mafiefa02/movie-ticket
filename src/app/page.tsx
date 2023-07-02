import Navbar from "@/components/layout/navbar";
import getQueryClient from "@/lib/get-query-client";
import { Hydrate } from "@/lib/hydrate";
import { prisma } from "@/prisma";
import { dehydrate } from "@tanstack/react-query";

import Hero from "./(sections)/hero";

async function getMovies() {
  const movies = await fetch(
    "https://seleksi-sea-2023.vercel.app/api/movies"
  ).then((res) => res.json());
  return movies
}


export default async function Home() {
  const movies = await getMovies()
  return (
    <>
      <Navbar />
      <main>
        <Hero movies={movies} />
      </main>
    </>
  )
}
