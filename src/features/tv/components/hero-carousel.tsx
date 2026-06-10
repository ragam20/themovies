"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { publicEnv } from "@/config/public-env";
import { TVShowList } from "@/types/tv";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import Image from "next/image";

type HeroCarouselProps = {
  tvs: TVShowList[];
};

export const HeroCarousel = ({ tvs }: HeroCarouselProps) => {
  return (
    <section>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {tvs.map((tv) => {
            return (
              <CarouselItem key={tv.id} className="h-full p-0">
                <div className="relative min-h-[70vh]">
                  <Image
                    alt="hero-image"
                    src={`${publicEnv.TMDB_BASE_IMG_URL}/original/${tv.backdrop_path}`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute h-full inset-0 z-10 w-full bg-linear-to-t from-background via-background/50 to-transparent" />

                  <div className="absolute bottom-0 left-0 z-20 max-w-xl rounded-tr-3xl p-10 backdrop-blur-sm">
                    <h1 className="text-6xl font-semibold text-white">
                      {tv.name}
                    </h1>
                    <p className="mt-4 w-120 line-clamp-2 text-white/40">
                      {tv.overview}
                    </p>
                    <div className="mt-4 flex gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <p className="text-white">
                          {(tv.vote_average / 2).toFixed(1)}
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
    </section>
  );
};
