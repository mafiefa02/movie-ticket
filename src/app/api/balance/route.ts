import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body) return NextResponse.json({ status: 400 });
  const { amount, email } = body;

  const update = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      balance: {
        increment: amount,
      },
    },
  });
  return NextResponse.json(update, { status: 200 });
}
