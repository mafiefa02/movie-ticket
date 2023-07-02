import Navbar from "@/components/layout/navbar";
import {
  getMovieByTitleServer,
  getMoviesServer,
} from "@/lib/server/fetch-utils";

import Hero from "./(sections)/hero";
import NowPlaying from "./(sections)/now-playing";

export default async function Home() {
  const nowPlaying = await getMoviesServer();
  const random = Math.floor(Math.random() * nowPlaying.length);
  const featured = nowPlaying[random];
  const featuredBackdrop = await getMovieByTitleServer(featured.title).then(
    (res) => {
      if (res === null) return featured.poster_url;
      return res.backdrop_path;
    }
  );

  return (
    <>
      <Navbar />
      <Hero movie={featured} backdrop={featuredBackdrop} />
      <NowPlaying movies={nowPlaying} />
    </>
  );
}
