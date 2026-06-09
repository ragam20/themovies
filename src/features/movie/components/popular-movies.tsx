import { MovieListComp } from "@/components/list/movie-list";
import { publicEnv } from "@/config/public-env";
import { MovieList } from "@/types/movie";
import { Star } from "lucide-react";
import Image from "next/image";

type PopularMoviesProps = {
  popularMovies: MovieList[];
};

export const MoviesSection = ({
  popularMovies: popularMovies,
}: PopularMoviesProps) => {
  return (
    <section id="movie-list" className="mt-24 flex flex-col gap-8 p-4">
      <MovieListComp movies={popularMovies} titleSection="Popular" />
      <MovieListComp movies={popularMovies} titleSection="Now Playing" />
      <MovieListComp movies={popularMovies} titleSection="Up Coming" />
    </section>
  );
};
