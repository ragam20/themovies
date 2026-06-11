import { publicEnv } from "@/config/public-env";
import { Cast } from "@/types/common";
import { MovieDetail } from "@/types/movie";
import { Star } from "lucide-react";
import Image from "next/image";

type DetailProps = {
  movie: MovieDetail;
  casts?: Cast[];
};
export const Detail = ({ movie, casts }: DetailProps) => {
  const hasCasts = casts && casts.length > 0;

  return (
    <div>
      <div className="relative h-[50vh]">
        <Image
          alt="movie-banner"
          fill
          className="object-cover object-top"
          src={`${publicEnv.TMDB_BASE_IMG_URL}/original${movie?.backdrop_path}`}
        />
        <div className="absolute w-full h-full inset-0 bg-linear-to-t from-background via-background/50 to-transparent z-10" />
      </div>
      <div className="p-4">
        <h1 className="text-white mt-4 font-bold text-4xl">{movie?.title}</h1>
        <ul className="mt-2 flex gap-4">
          {movie?.genres.map((genre) => {
            return (
              <li key={genre.id} className="text-white font-bold">
                {genre.name}
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex gap-2 items-center">
          <p className="text-white italic">Rating: </p>
          <p className="text-white">
            {(movie.vote_average === 0 ? 0 : movie?.vote_average / 2).toFixed(
              1,
            )}
            {"/5"}
          </p>
          <Star fill="#e6b917" className="" />
        </div>
        <p className="mt-4 text-white/60 md:w-180 text-left">
          {movie?.overview}
        </p>
      </div>

      <div className="p-4 mt-8">
        <h1 className="font-heading text-2xl text-white">Casts</h1>
        <ul className="mt-4 flex gap-4 overflow-x-auto no-scrollbar">
          {!hasCasts ? (
            <li className="w-full text-center text-white">No cast</li>
          ) : (
            casts?.map((cast) => (
              <li
                key={cast.id}
                className="flex shrink-0 flex-col items-center gap-2"
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    alt={cast.name}
                    fill
                    className="object-cover"
                    src={
                      cast.profile_path
                        ? `${publicEnv.TMDB_BASE_IMG_URL}/original${cast.profile_path}`
                        : ""
                    }
                  />
                </div>

                <p className="w-40 truncate text-center text-md font-bold text-white">
                  {cast.name}
                </p>

                <p className="w-40 text-center text-sm text-white/70">
                  {cast.character}
                </p>
              </li>
            ))
          )}
        </ul>{" "}
      </div>
    </div>
  );
};
