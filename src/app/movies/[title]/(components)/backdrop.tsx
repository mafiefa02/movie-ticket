import Image from "next/image";
import React from "react";

import { tmdbMovie } from "@/types/tmdb";
import { Movie } from "@prisma/client";

export default function Backdrop({
  movie,
  movieDetails,
}: {
  movie: Movie;
  movieDetails: tmdbMovie;
}) {
  return (
    <section
      id="backdrop"
      className="absolute left-0 top-0 -z-10 h-[70vh] w-full"
    >
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-t from-background to-transparent" />
      <Image
        alt={movie.title}
        src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
        fill
        style={{ objectFit: "cover", objectPosition: "50% 0%", zIndex: -40 }}
      />
    </section>
  );
}
