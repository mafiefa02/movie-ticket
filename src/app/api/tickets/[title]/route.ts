import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { title: string } }
) {
  const tickets = await prisma.ticket.findMany({
    where: {
      movieTitle: params.title,
    },
  });

  return NextResponse.json({ result: tickets });
}
