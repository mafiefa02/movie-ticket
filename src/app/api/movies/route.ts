import { NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(req: Request) {
  const movies = await prisma.movie.findMany();

  return NextResponse.json(movies);
}
