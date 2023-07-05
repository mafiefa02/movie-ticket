"use client";
import { set } from "date-fns";
import { ChangeEvent, useEffect, useState } from "react";

import Container from "@/components/layout/container";
import { H1, H3 } from "@/components/typography";
import { Input } from "@/components/ui/input";
import { getMoviesClient } from "@/lib/client/fetch-utils";
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import MovieCard from "./(components)/movie-card";

export default function NowPlaying({ movies }: { movies: Movie[] }) {
  const [search, setSearch] = useState("");
  const [moviesData, setMoviesData] = useState(movies);
  const { data, isLoading, isError, error } = useQuery<Movie[], Error>({
    queryKey: ["movies"],
    queryFn: getMoviesClient,
    initialData: movies,
  });

  useEffect(() => {
    if (search) {
      const filteredMovies = data.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );

      setMoviesData(filteredMovies);
    }

    if (!search) {
      setMoviesData(data);
    }
  }, [search, data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <Container className="mt-8 flex flex-col items-center gap-6">
      <div className="-mb-8 flex w-full flex-row items-center justify-between gap-2">
        <H3 className="text-primary">Now Playing</H3>
        <Input
          className="w-1/2 lg:w-1/3"
          placeholder="Search"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </div>
      <div className="w-full overflow-x-auto">
        <div className="relative grid grid-flow-col justify-start space-x-5 overflow-y-hidden pb-2 pt-8">
          {moviesData.length === 0 ? (
            <div className="flex h-24 w-full items-center justify-center">
              <H1>No movies matching your criteria.</H1>
            </div>
          ) : (
            moviesData.map((movie) => {
              return <MovieCard key={movie.title} movie={movie} />;
            })
          )}
        </div>
      </div>
    </Container>
  );
}
