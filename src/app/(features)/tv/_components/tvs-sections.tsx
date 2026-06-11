import { TVShowListComp } from "@/features/tv/components/tv-list";
import { TVShowList } from "@/types/tv";

type TVShowListSectionProps = {
  airingToday: TVShowList[];
  popular: TVShowList[];
  onTheAir: TVShowList[];
};
export const TVShowListSection = ({
  airingToday,
  popular,
  onTheAir,
}: TVShowListSectionProps) => {
  return (
    <section
      id="tv-list"
      className="mx-auto max-w-fit mt-24 flex flex-col gap-8 p-4"
    >
      <TVShowListComp
        listType="airing-today"
        tvShows={airingToday}
        titleSection="Airing Today"
      />
      <TVShowListComp
        listType="popular"
        tvShows={popular}
        titleSection="Popular"
      />
      <TVShowListComp
        listType="on-the-air"
        tvShows={onTheAir}
        titleSection="On The Air"
      />
    </section>
  );
};
