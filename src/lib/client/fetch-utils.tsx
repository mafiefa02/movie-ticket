"use client";

import { tmdbMovie, tmdbMovieDetails } from "@/types/tmdb";
import { Movie, Ticket } from "@prisma/client";

export async function getMovieByTitleClient(title: string) {
  const data: { result: tmdbMovie } = await fetch(
    `/api/movies/title/${title}`
  ).then((res) => res.json());
  return data.result;
}

export async function getMoviesClient() {
  const movies: { result: Movie[] } = await fetch("/api/movies").then((res) =>
    res.json()
  );
  return movies.result;
}

export async function getMovieByIdClient(id: string) {
  const data: { result: tmdbMovieDetails } = await fetch(
    `/api/movies/${id}`
  ).then((res) => res.json());
  return data.result;
}

export async function getTicketsWithTitleClient(title: string) {
  const data: { result: Ticket[] } = await fetch(`/api/tickets/${title}`).then(
    (res) => res.json()
  );

  return data.result;
}

interface TicketData {
  movieTitle: string;
  seat: string[];
  cinemas: string;
  date: string;
  time: string;
  userEmail: string;
  price: number;
}

export async function buyTicket(data: TicketData) {
  const submit: { result: string } = await fetch(`/api/tickets`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }

    return { result: "error" };
  });

  return submit.result;
}

export async function topUpBalanceClient(amount: number, email: string) {
  const res = await fetch(`/api/balance/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, email }),
  }).then((res) => res.json());

  return res;
}
