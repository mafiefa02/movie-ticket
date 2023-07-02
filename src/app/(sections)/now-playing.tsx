"use client";
import Container from "@/components/layout/container";
import { H3 } from "@/components/typography";
import { getMoviesClient } from "@/lib/client/fetch-utils";
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import MovieCard from "./(components)/movie-card";

export default function NowPlaying({ movies }: { movies: Movie[] }) {
  const { data, isLoading, isError, error } = useQuery<Movie[], Error>({
    queryKey: ["movies"],
    queryFn: getMoviesClient,
    initialData: movies,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <Container className="mt-8 flex flex-col items-center gap-6">
      <H3 className="-mb-8 w-full text-primary">Now Playing</H3>
      <div className="w-full overflow-x-auto">
        <div className="relative grid grid-flow-col space-x-5 overflow-y-hidden px-6 pb-2 pt-8">
          {data.map((movie) => {
            return <MovieCard key={movie.title} movie={movie} />;
          })}
        </div>
      </div>
    </Container>
  );
}
