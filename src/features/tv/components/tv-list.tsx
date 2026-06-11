"use client";

import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { publicEnv } from "@/config/public-env";
import { createSlug } from "@/lib/utils";
import { TVShowList } from "@/types/tv";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type ListType = "airing-today" | "popular" | "on-the-air";

type TVShowListProps = {
  listType: ListType;
  titleSection: string;
  tvShows: TVShowList[];
};
export const TVShowListComp = ({
  listType,
  titleSection,
  tvShows,
}: TVShowListProps) => {
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
          onClick={() =>
            router.push(paths.tv.list.getHref(createSlug(listType)))
          }
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
          {tvShows.map((tv) => {
            return (
              <div key={tv.id} className="shrink-0 flex flex-col w-30">
                <div className="relative rounded-md cursor-pointer h-45 w-30 transition-all duration-300 hover:scale-110  hover:z-10">
                  <Image
                    onClick={() =>
                      router.push(
                        paths.tv.detail.getHref(tv.id, createSlug(tv.name)),
                      )
                    }
                    fill
                    className="object-cover object-top"
                    alt="tv poster"
                    src={`${publicEnv.TMDB_BASE_IMG_URL}/original${tv.poster_path}`}
                  />
                </div>

                <div className="mt-4 flex flex-col gap-1">
                  <h4 className="text-white text-sm font-bold truncate">
                    {tv.name}
                  </h4>
                  <div className="text-sm flex gap-2 items-center">
                    <p className="text-white">
                      {(tv.vote_average / 2).toFixed(1)}
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
