import { NextResponse } from "next/server";

import { Movie } from "@prisma/client";

// import { prisma } from "@/prisma";

export async function GET(req: Request) {
  // const movies = await prisma.movie.findMany();
  const movies: Movie[] = await fetch(
    "https://seleksi-sea-2023.vercel.app/api/movies"
  ).then((res) => res.json());

  return NextResponse.json({ result: movies });
}
