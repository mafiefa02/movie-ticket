"use client"
import Container from "@/components/layout/container";
import { H3 } from "@/components/typography";
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import MovieCard from "./(components)/movie-card";

async function getMovies() {
    const movies: { result: Movie[] } = await fetch(
        "/api/movies"
    ).then((res) => res.json());
    return movies.result
}

export default function NowPlaying({ movies }: { movies: Movie[] }) {
    const { data, isLoading, isError, error } = useQuery<Movie[], Error>({
        queryKey: ["movies"],
        queryFn: getMovies,
        initialData: movies,
    })

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>{error.message}</p>

    return (
        <Container className="flex flex-col items-center gap-6 mt-8">
            <H3 className="w-full text-primary -mb-8">Now Playing</H3>
            <div className="w-full overflow-x-auto">
                <div className="grid grid-flow-col space-x-5 px-6 pt-8 pb-2 overflow-y-hidden relative">
                    {data.map((movie) => { return (<MovieCard key={movie.title} movie={movie} />) })}
                </div>
            </div>
        </Container>
    )
}
