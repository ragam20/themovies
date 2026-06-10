import { TVShowListComp } from "@/components/list/tv-list";
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
      <TVShowListComp tvShows={airingToday} titleSection="Airing Today" />
      <TVShowListComp tvShows={popular} titleSection="Popular" />
      <TVShowListComp tvShows={onTheAir} titleSection="On The Air" />
    </section>
  );
};
