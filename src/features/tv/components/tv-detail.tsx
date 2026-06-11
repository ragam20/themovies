import { publicEnv } from "@/config/public-env";
import { Cast } from "@/types/common";
import { TvDetail } from "@/types/tv";
import { Star } from "lucide-react";
import Image from "next/image";

type DetailProps = {
  tv: TvDetail;
  casts: Cast[];
};
export const Detail = ({ tv, casts }: DetailProps) => {
  return (
    <div>
      <div className="relative h-[50vh]">
        <Image
          alt="tv-banner"
          fill
          className="object-cover object-top"
          src={`${publicEnv.TMDB_BASE_IMG_URL}/original${tv?.backdrop_path}`}
        />
        <div className="absolute w-full h-full inset-0 bg-linear-to-t from-background via-background/50 to-transparent z-10" />
      </div>
      <div className="p-4">
        <h1 className="text-white mt-4 font-bold text-4xl">{tv?.name}</h1>
        <ul className="mt-2 flex gap-4">
          {tv?.genres.map((genre) => {
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
            {(tv.vote_average === 0 ? 0 : tv?.vote_average / 2).toFixed(1)}
            {"/5"}
          </p>
          <Star fill="#e6b917" className="" />
        </div>
        <p className="mt-4 text-white/60 md:w-180 text-left">{tv?.overview}</p>
      </div>

      <div className="p-4 mt-8">
        <h1 className="font-heading text-2xl text-white">Casts</h1>
        <ul className="flex items-center justify-center md:justify-start gap-4 mt-4 overflow-x-auto no-scrollbar flex-wrap">
          {casts.map((cast) => {
            return (
              <li key={cast.id} className="flex flex-col gap-2 items-center">
                <div className="h-24 w-24 rounded-full overflow-hidden">
                  <Image
                    alt="profile-cast"
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                    src={`${publicEnv.TMDB_BASE_IMG_URL}/original${cast?.profile_path}`}
                  />
                </div>
                <p className="text-white w-40 text-center font-bold text-md truncate">
                  {cast.name}
                </p>
                <p className="text-white/70 w-40 text-sm text-center">
                  {cast.character}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
