"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

async function getMovies() {
    const res = await fetch("/api/movies")

    const movies = await res.json()
    return movies
}

export default function Hero({ movies }: { movies: Movie[] }) {
    const { data, isLoading, isError, error } = useQuery<Movie[], Error>({
        queryKey: ["movies"],
        queryFn: getMovies,
        initialData: movies,
    })

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>{error.message}</p>

    return (
        <section id="hero" className="absolute bg-red-50 left-0 top-0 w-full h-screen">
            {data.map((movie) => {
                return (
                    <Image key={movie.id} src={movie.poster_url} alt={movie.title} width={50} height={50} />
                )
            })}
        </section>
    )
}
