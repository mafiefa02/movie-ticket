"use client"
import Image from "next/image";

import Container from "@/components/layout/container";
import { H3 } from "@/components/typography";
import { Card } from "@/components/ui/card";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

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

    const { width } = useWindowDimensions()
    const isMobile = width! <= 640

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>{error.message}</p>

    return (
        <Container className="flex flex-col items-center gap-6 mt-8">
            <H3 className="w-full text-primary">Now Playing</H3>
            <div className="w-full overflow-x-auto">
                <div className="grid grid-flow-col space-x-5 py-2">
                    {data.map((movie) => {
                        return (
                            <Card key={movie.title} className="w-max overflow-hidden">
                                <Image src={movie.poster_url} alt={movie.title} width={isMobile ? 200 : 300} height={isMobile ? 300 : 450} style={{ objectFit: "cover" }} />
                            </Card>
                        )
                    })}
                </div>
            </div>
        </Container>
    )
}
