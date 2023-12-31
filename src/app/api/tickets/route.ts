import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(req: NextRequest) {
  const tickets = await prisma.ticket.findMany({
    include: {
      user: true,
    },
  });

  if (!tickets) {
    return NextResponse.json(
      { result: "Something went wrong" },
      { status: 500 }
    );
  }

  return NextResponse.json({ result: tickets }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const [createTicket, updateBalance] = await prisma.$transaction([
    prisma.ticket.create({
      data: {
        date: body.date,
        theater: body.cinemas,
        time: body.time,
        seats: body.seat,
        movieTitle: body.movieTitle,
        userEmail: body.userEmail,
      },
    }),
    prisma.user.update({
      where: {
        email: body.userEmail,
      },
      data: {
        balance: {
          decrement: body.price * body.seat.length,
        },
      },
    }),
  ]);

  if (!createTicket || !updateBalance) {
    return NextResponse.json(
      { result: "Something went wrong" },
      { status: 500 }
    );
  }

  return NextResponse.json({ result: createTicket }, { status: 200 });
}
