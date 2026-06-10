import { Footer } from "@/components/footer";
import { MainHeader } from "@/components/main-header";
import { getAiringToday } from "@/features/tv/api/get-airing-today";
import { getOnTheAir } from "@/features/tv/api/get-on-the-air";
import { getPopular } from "@/features/tv/api/get-popular";
import { HeroCarousel } from "@/features/tv/components/hero-carousel";
import { TVShowListSection } from "@/features/tv/components/tvs-sections";
import { addDate, formatDate } from "@/lib/utils";

export default async function TVPage() {
  const minDate = addDate(new Date(), {});
  const maxDate = addDate(new Date(), { days: 7 });

  const [airingToday, onTheAir, popular] = await Promise.all([
    await getAiringToday({ page: 1 }),
    await getOnTheAir({
      page: 1,
      minDate: formatDate(minDate),
      maxDate: formatDate(maxDate),
    }),
    await getPopular({ page: 1 }),
  ]);

  return (
    <div className="relative overflow-hidden flex flex-col">
      <MainHeader />

      <main className="flex-1">
        <HeroCarousel tvs={airingToday} />
        <TVShowListSection
          airingToday={airingToday}
          onTheAir={onTheAir}
          popular={popular}
        />
      </main>

      <Footer />
    </div>
  );
}
