import { notFound } from "next/navigation";

import Container from "@/components/layout/container";
import Navbar from "@/components/layout/navbar";
import { H1, P } from "@/components/typography";
import {
  getMovieByTitleServer,
  getMoviesServer,
  getTicketsWithTitleServer,
} from "@/lib/server/fetch-utils";

import Backdrop from "./(components)/backdrop";
import ChooseSeat from "./(components)/choose-seat";

export async function generateStaticParams() {
  const movies = await getMoviesServer();
  return movies.map((movie) => ({
    params: { title: movie.title },
  }));
}

export default async function Movies({
  params,
}: {
  params: { title: string };
}) {
  const movies = await getMoviesServer();
  const movie = movies.find(
    (movie) => movie.title === decodeURIComponent(params.title)
  );
  if (!movie) return notFound();

  const movieDetails = await getMovieByTitleServer(movie.title);
  if (!movieDetails) return notFound();

  const tickets = await getTicketsWithTitleServer(
    decodeURIComponent(params.title)
  );

  return (
    <>
      <Navbar />
      <Backdrop movie={movie} movieDetails={movieDetails} />
      <Container>
        <div className="relative flex h-[50vh] w-full items-end">
          <H1 className="max-w-4xl text-primary drop-shadow-2xl lg:text-6xl">
            {movie.title}
          </H1>
        </div>
        <div className="mt-4 flex w-full flex-col-reverse justify-between gap-4 md:mt-8 md:flex-row md:gap-8 lg:gap-0">
          <P className="w-full">{movieDetails.overview}</P>
          <div className="flex w-full flex-row items-start gap-8 md:flex-col md:gap-2 lg:items-end">
            <p className="w-max text-left text-xs text-primary md:text-sm lg:text-right lg:text-base">
              <span className="block font-semibold md:inline">
                Age rating <span className="hidden md:inline">— </span>
              </span>
              {movie.age_rating}+
            </p>
            <p className="w-max text-left text-xs text-primary md:text-sm lg:text-right lg:text-base">
              <span className="block font-semibold md:inline">
                Popularity <span className="hidden md:inline">— </span>
              </span>
              {movieDetails.popularity}
            </p>
            <p className="w-max text-left text-xs text-primary md:text-sm lg:text-right lg:text-base">
              <span className="block font-semibold md:inline">
                Released <span className="hidden md:inline">— </span>
              </span>
              {movie.release_date}
            </p>
          </div>
        </div>
      </Container>
      <ChooseSeat tickets={tickets} movie={movie} movieDetails={movieDetails} />
    </>
  );
}
