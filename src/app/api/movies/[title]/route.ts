import { NextRequest, NextResponse } from "next/server";

import { tmdbMovie, tmdbResponse } from "@/types/tmdb";

export async function GET(
  req: NextRequest,
  { params }: { params: { title: string } }
) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };
  const res: tmdbResponse = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${params.title}`,
    options
  ).then((res) => res.json());

  if (res.results.length === 0) {
    return NextResponse.json({ result: null });
  }

  return NextResponse.json({ result: res.results[0] as tmdbMovie });
}
