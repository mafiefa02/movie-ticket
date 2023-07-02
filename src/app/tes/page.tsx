"use client"
import { useQuery } from "@tanstack/react-query";

async function getMovies(title: string) {
    const res = await fetch(`/api/movies/${title}`).then((res) => res.json());
    return res
}

export default async function Tes() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["movies", "John Wick"],
        queryFn: () => getMovies("John Wick"),
    })

    return (
        <div>
            <h1>{data === undefined ? 'undefined' : data} lol</h1>
        </div>
    )
}