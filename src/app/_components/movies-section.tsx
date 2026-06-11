"use client";

import { paths } from "@/config/paths";
import { MovieListComp } from "@/features/movie/components/movie-list";
import { MovieList } from "@/types/movie";
import { useRouter } from "next/navigation";

type PopularMoviesProps = {
  popularMovies: MovieList[];
  nowPlaying: MovieList[];
  upComing: MovieList[];
};

export const MoviesSection = ({
  popularMovies,
  nowPlaying,
  upComing,
}: PopularMoviesProps) => {
  const router = useRouter();

  return (
    <section
      id="movie-list"
      className="mx-auto max-w-fit mt-25 flex flex-col gap-8 p-4"
    >
      <MovieListComp
        listType="popular"
        movies={popularMovies}
        titleSection="Popular"
        onViewAllAction={(type) => {
          router.push(paths.movie.list.getHref(type));
        }}
      />
      <MovieListComp
        listType="now-playing"
        movies={nowPlaying}
        titleSection="Now Playing"
        onViewAllAction={(type) => {
          router.push(paths.movie.list.getHref(type));
        }}
      />
      <MovieListComp
        listType="up-coming"
        movies={upComing}
        titleSection="Up Coming"
        onViewAllAction={(type) => {
          router.push(paths.movie.list.getHref(type));
        }}
      />
    </section>
  );
};
