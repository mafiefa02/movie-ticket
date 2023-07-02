import {
  getMovieByIdServer,
  getMovieByTitleServer,
  getMoviesServer,
} from "@/lib/server/fetch-utils";

export async function generateStaticParams() {
  const movies = await getMoviesServer();

  const titles = movies.map((movie) => movie.title);

  const details = titles.map(async (title) => {
    const detail = await getMovieByTitleServer(title);
    return detail;
  });

  const detailsResolved = await Promise.all(details);

  const id = detailsResolved.map((detail) => detail?.id);

  return id.map((id) => ({ params: { id: id?.toString() } }));
}

export default async function Movies({ params }: { params: { id: string } }) {
  const movie = await getMovieByIdServer(params.id);

  if (!movie.id) {
    return <p>Movie with id={params.id} not found</p>;
  }

  return (
    <div>
      <h1>{JSON.stringify(movie)}</h1>
    </div>
  );
}
