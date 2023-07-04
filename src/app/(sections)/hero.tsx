"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import Container from "@/components/layout/container";
import { H1, P } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getMovieByTitleClient } from "@/lib/client/fetch-utils";
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function Hero({
  movie,
  backdrop,
}: {
  movie: Movie;
  backdrop: string;
}) {
  const { data, isLoading, isError, error } = useQuery<string, Error>({
    queryKey: ["backdrop", movie.title],
    queryFn: () =>
      getMovieByTitleClient(movie.title).then((res) => res.backdrop_path),
    initialData: backdrop,
  });

  if (isLoading) {
    return (
      <Container className="h-[70vh]">
        <div className="absolute left-0 top-0 -z-50 h-screen w-full">
          <div className="absolute left-0 top-0 h-screen w-full bg-gradient-to-t from-background to-transparent" />
          <div className="absolute left-0 top-0 h-screen w-full bg-gradient-to-tr from-background to-transparent" />
          <Skeleton className="h-full w-full" />
        </div>
        <div className="relative flex h-full max-w-sm flex-col items-start justify-end md:max-w-xl">
          <H1 className="text-primary">{movie.title}</H1>
          <div className="flex w-full flex-row">
            <P>{movie.release_date}</P>
          </div>
          <P className="text-foreground/20 line-clamp-4 text-lg">
            {movie.description}
          </P>
          <div className="mt-8 flex w-full flex-row items-center gap-px sm:gap-4">
            <Button disabled className="sm:w-1/2">
              Nonton Sekarang
            </Button>
            <Button disabled className="justify-start sm:w-1/2" variant="link">
              Lihat Sinopsis
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <>
      {
        <Container className="h-[70vh]">
          <div className="absolute left-0 top-0 -z-50 h-screen w-full">
            <div className="absolute left-0 top-0 h-screen w-full bg-gradient-to-t from-background to-transparent" />
            <div className="absolute left-0 top-0 h-screen w-full bg-gradient-to-tr from-background to-transparent" />
            <Image
              key={movie.title}
              src={`https://image.tmdb.org/t/p/original/${data}`}
              alt={movie.title}
              fill
              style={{ objectFit: "cover", zIndex: -40 }}
              placeholder="blur"
              blurDataURL={"process.env.BLUR_DATA_URL"}
            />
          </div>
          <div className="relative flex h-full max-w-sm flex-col items-start justify-end md:max-w-xl">
            <H1 className="text-primary">{movie.title}</H1>
            <div className="flex w-full flex-row justify-between">
              <P className="-mb-3 mt-2 text-xs opacity-50">
                Released{" "}
                <span className="inline font-bold">{movie.release_date}</span>
              </P>
            </div>
            <P className="text-foreground/20 line-clamp-4 text-lg">
              {movie.description}
            </P>
            <div className="mt-8 flex w-full flex-row items-center gap-px sm:gap-4">
              <Button className="sm:w-1/2" asChild>
                <Link href={`/movies/${movie.title}`}>Nonton Sekarang</Link>
              </Button>
              <Button className="justify-start sm:w-1/2" variant="link">
                <Link href={`/movies/${movie.title}`}>Lihat Sinopsis</Link>
              </Button>
            </div>
          </div>
        </Container>
      }
    </>
  );
}
