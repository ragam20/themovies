"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { publicEnv } from "@/config/public-env";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { MovieList } from "@/types/movie";
import { Star } from "lucide-react";

type HeroCarouselProps = {
  movies: MovieList[];
};

export const HeroCarousel = ({ movies }: HeroCarouselProps) => {
  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {movies.map((movie) => {
            return (
              <CarouselItem key={movie.id} className="h-full p-0">
                <div className="relative min-h-[70vh]">
                  <Image
                    alt="hero-image"
                    src={`${publicEnv.TMDB_BASE_IMG_URL}/original/${movie.backdrop_path}`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute h-full inset-0 z-10 w-full bg-linear-to-t from-background via-background/50 to-transparent" />

                  <div className="absolute bottom-0 left-0 z-20 max-w-xl rounded-tr-3xl p-10 backdrop-blur-sm">
                    <h1 className="text-6xl font-semibold text-white">
                      {movie.title}
                    </h1>
                    <p className="mt-4 w-120 line-clamp-2 text-white/40">
                      {movie.overview}
                    </p>
                    <div className="mt-4 flex gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <p className="text-white">
                          {(movie.vote_average / 2).toFixed(1)}
                          {"/5"}
                        </p>
                        <Star fill="#e6b917" className="" />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
