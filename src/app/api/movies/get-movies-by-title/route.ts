import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const title = headers().get("title")?.toString();
  if (!title)
    return NextResponse.json({ error: "No title provided" }, { status: 400 });

  const titleURL = title.replace(" ", "%20").replace("&", "%26");
  const movieBackdrop = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${titleURL}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    }
  ).then((res) => res.json());

  return NextResponse.json(movieBackdrop);
}
