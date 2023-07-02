"use client"
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";

import Container from "@/components/layout/container";
import { H1, P } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { tmdbMovie, tmdbResponse } from "@/types/tmdb";
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

async function getMovieByTitle(title: string) {
    const data: { result: tmdbMovie } = await fetch(`/api/movies/${title}`).then((res) => res.json());
    return data.result
}

export default function Hero({ movie, backdrop }: { movie: Movie, backdrop: string }) {
    const { data, isLoading, isError, error } = useQuery<string, Error>({
        queryKey: ["backdrop", movie.title],
        queryFn: () => getMovieByTitle(movie.title).then((res) => res.backdrop_path),
        initialData: backdrop,
    })

    if (isLoading) {
        return (
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
    }

    return (
        <>
            {
                <Container className="h-[70vh]">
                    <div className="absolute left-0 top-0 w-full h-screen -z-50">
                        <div className="absolute left-0 top-0 w-full h-screen bg-gradient-to-t from-background to-transparent" />
                        <div className="absolute left-0 top-0 w-full h-screen bg-gradient-to-tr from-background to-transparent" />
                        <Image key={movie.title} src={`https://image.tmdb.org/t/p/original/${data}`} alt={movie.title} fill style={{ objectFit: "cover", zIndex: -40 }} placeholder="blur" blurDataURL={"process.env.BLUR_DATA_URL"} />
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
            }
        </>
    )
}
