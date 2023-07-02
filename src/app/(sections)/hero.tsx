"use client"
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";

import Container from "@/components/layout/container";
import { H1, P } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

async function getMovieByTitle(title: string) {
    const data = await fetch(`/api/movies/get-movies-by-title/`, {
        headers: {
            title: title
        }
    }).then((res) => res.json());

    const result = await data
    return result
}

interface tmdbResponse {
    page: number,
    results: tmdbMovieType[],
    total_pages: number,
    total_results: number
}

interface tmdbMovieType {
    "adult": boolean,
    "backdrop_path": string,
    "genre_ids": number[],
    "id": number,
    "original_language": string,
    "original_title": string,
    "overview": string,
    "popularity": number,
    "poster_path": string,
    "release_date": string,
    "title": string,
    "video": boolean,
    "vote_average": number,
    "vote_count": number
}

export default function Hero({ movie }: { movie: Movie }) {
    const { data, isLoading, isError, error } = useQuery<tmdbResponse, Error>({
        queryKey: ["movies", movie.title],
        queryFn: () => getMovieByTitle(movie.title),
    })

    if (isLoading) return (
        <Container className="h-[70vh]">
            <div className="absolute left-0 top-0 w-full h-screen -z-50">
                <div className="absolute left-0 top-0 w-full h-screen bg-gradient-to-t from-background to-transparent" />
                <div className="absolute left-0 top-0 w-full h-screen bg-gradient-to-tr from-background to-transparent" />
                <Skeleton className="w-full h-full" />
            </div>
            <div className="relative max-w-sm md:max-w-xl flex flex-col items-start justify-end h-full">
                <H1 className="text-primary">{movie.title}</H1>
                <P className="line-clamp-4 text-foreground/20 text-lg">{movie.description}</P>
                <div className="flex flex-row items-center w-full gap-px sm:gap-4 mt-8">
                    <Button className="sm:w-1/2">Nonton Sekarang</Button>
                    <Button className="justify-start sm:w-1/2" variant="link">Lihat Sinopsis</Button>
                </div>
            </div>
        </Container>
    )
    if (isError) return <p>{error.message}</p>

    const featuredMovie = data?.results
    return (
        <Container className="h-[70vh]">
            <div className="absolute left-0 top-0 w-full h-screen -z-50">
                <div className="absolute left-0 top-0 w-full h-screen bg-gradient-to-t from-background to-transparent" />
                <div className="absolute left-0 top-0 w-full h-screen bg-gradient-to-tr from-background to-transparent" />
                {featuredMovie && <Image key={movie.title} src={`https://image.tmdb.org/t/p/original/${featuredMovie[0].backdrop_path}`} alt={movie.title} fill style={{ objectFit: "cover", zIndex: -40 }} placeholder="blur" blurDataURL={"process.env.BLUR_DATA_URL"} />}
            </div>
            <div className="relative max-w-sm md:max-w-xl flex flex-col items-start justify-end h-full">
                <H1 className="text-primary">{movie.title}</H1>
                <P className="line-clamp-4 text-foreground/20 text-lg">{movie.description}</P>
                <div className="flex flex-row items-center w-full gap-px sm:gap-4 mt-8">
                    <Button className="sm:w-1/2">Nonton Sekarang</Button>
                    <Button className="justify-start sm:w-1/2" variant="link">Lihat Sinopsis</Button>
                </div>
            </div>
        </Container>
    )
}
