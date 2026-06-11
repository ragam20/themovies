import { Footer } from "@/components/footer";
import { MainHeader } from "@/components/main-header";
import { getNowPlaying } from "@/features/movie/api/get-now-playing";
import { getPopular } from "@/features/movie/api/get-popular";
import { getUpComing } from "@/features/movie/api/get-up-coming";
import { HeroCarousel } from "@/features/movie/components/hero-carousel";
import { MoviesSection } from "@/app/_components/movies-section";
import { addDate, formatDate } from "@/lib/utils";

export default async function Home() {
  const minDate = addDate(new Date(), {});
  const maxDate = addDate(new Date(), { days: 7 });

  const [nowPlaying, popular, upcoming] = await Promise.all([
    await getNowPlaying({
      page: 1,
      minDate: formatDate(minDate),
      maxDate: formatDate(maxDate),
    }),
    await getPopular({ page: 1 }),
    await getUpComing({
      page: 1,
      minDate: formatDate(minDate),
      maxDate: formatDate(maxDate),
    }),
  ]);

  return (
    <div className="relative overflow-hidden flex flex-col">
      <MainHeader />

      <main className="flex-1">
        <HeroCarousel movies={nowPlaying.results} />
        <MoviesSection
          popularMovies={popular.results}
          nowPlaying={nowPlaying.results}
          upComing={upcoming.results}
        />
      </main>

      <Footer />
    </div>
  );
}
