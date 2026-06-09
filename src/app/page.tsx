import { Footer } from "@/components/footer";
import { MainHeader } from "@/components/main-header";
import { getNowPlaying } from "@/features/movie/api/get-now-playing";
import { HeroCarousel } from "@/features/movie/components/hero-carousel";
import { MoviesSection } from "@/features/movie/components/popular-movies";
import { addDate, formatDate } from "@/lib/utils";

export default async function Home() {
  const minDate = addDate(new Date(), {});
  const maxDate = addDate(new Date(), { days: 7 });

  const movies = await getNowPlaying({
    page: 1,
    minDate: formatDate(minDate),
    maxDate: formatDate(maxDate),
  });

  return (
    <div className="relative overflow-hidden flex flex-col">
      <MainHeader />

      <main className="flex-1">
        <section id="hero-section">
          <HeroCarousel movies={movies} />
        </section>

        <MoviesSection popularMovies={movies} />
      </main>

      <Footer />
    </div>
  );
}
