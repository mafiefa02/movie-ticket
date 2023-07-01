import Navbar from "@/components/layout/navbar";
import getQueryClient from "@/lib/get-query-client";
import { Hydrate } from "@/lib/hydrate";
import { prisma } from "@/prisma";
import { dehydrate } from "@tanstack/react-query";

import Hero from "./(sections)/hero";

async function getMovies() {
  const movies = await prisma.movie.findMany()
  return movies
}


export default async function Home() {
  const movies = await prisma.movie.findMany({ take: 10 })
  return (
    <>
      <Navbar />
      <main>
        <Hero movies={movies} />
      </main>
    </>
  )
}
