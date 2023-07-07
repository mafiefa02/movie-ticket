import React from "react";

import { getMoviesServer } from "@/lib/server/fetch-utils";
import { prisma } from "@/prisma";

import TicketItem from "./(components)/ticket-item";

async function fetchTickets() {
  const res = await prisma.ticket.findMany();
  return res;
}

export default async function TicketsPage() {
  const tickets = await fetchTickets();
  const movies = await getMoviesServer();
  return <TicketItem movies={movies} tickets={tickets} />;
}
