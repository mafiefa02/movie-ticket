import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  const res = await fetch(
    "https://api.themoviedb.org/3/movie/" + params.id,
    options
  ).then((res) => res.json());

  return NextResponse.json({ result: res });
}
