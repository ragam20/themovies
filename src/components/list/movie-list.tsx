"use client";

import { publicEnv } from "@/config/public-env";
import { MovieList } from "@/types/movie";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { paths } from "@/config/paths";
import { createSlug } from "@/lib/utils";

type ListType = "popular" | "now-playing" | "up-coming";

type MovieListProps = {
  listType: ListType;
  onViewAllAction: (type: ListType) => void;
  titleSection: string;
  movies: MovieList[];
};
export const MovieListComp = ({
  titleSection,
  movies,
  onViewAllAction,
  listType,
}: MovieListProps) => {
  const router = useRouter();
  const scrollRef = useRef<HTMLUListElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-heading text-white text-4xl">{titleSection}</h1>
        <Button
          onClick={() => onViewAllAction(listType)}
          className="rounded-sm cursor-pointer text-xs p-1 bg-primary"
        >
          <p className="text-white">View All</p>
        </Button>
      </div>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="cursor-pointer absolute backdrop-blur-2xl left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-transparent p-2 text-white"
        >
          <ChevronLeft />
        </button>

        <ul
          ref={scrollRef}
          className="no-scrollbar mt-4 flex gap-4 overflow-x-auto"
        >
          {movies.map((movie) => {
            return (
              <div key={movie.id} className="shrink-0 flex flex-col w-30">
                <div className="rounded-md cursor-pointer h-44 transition-all duration-300 hover:scale-110  hover:z-10">
                  <Image
                    onClick={() =>
                      router.push(
                        paths.movie.detail.getHref(
                          movie.id,
                          createSlug(movie.title),
                        ),
                      )
                    }
                    alt="movie poster"
                    width={120}
                    height={180}
                    className="rounded-md cursor-pointer"
                    src={`${publicEnv.TMDB_BASE_IMG_URL}/original${movie.poster_path}`}
                  />
                </div>

                <div className="mt-4 flex flex-col gap-1">
                  <h4 className="text-white text-sm font-bold truncate">
                    {movie.title}
                  </h4>
                  <div className="text-sm flex gap-2 items-center">
                    <p className="text-white">
                      {(movie.vote_average / 2).toFixed(1)}
                      {"/5"}
                    </p>
                    <Star fill="#e6b917" size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </ul>

        <button
          onClick={scrollRight}
          className="cursor-pointer absolute backdrop-blur-2xl right-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
