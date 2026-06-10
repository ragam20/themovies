import { Footer } from "@/components/footer";
import { getCredits } from "@/features/movie/api/get-credits";
import { getMovieDetail } from "@/features/movie/api/get-details";
import { Detail } from "@/features/movie/components/movie-detail";

type MovieDetailPageProps = {
  params: Promise<{
    slug: string;
    id: string | number;
  }>;
};

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { id } = await params;

  const [movie, casts] = await Promise.all([
    await getMovieDetail({ id: id }),
    await getCredits(id),
  ]);

  return (
    <div className="flex flex-col overflow-hidden">
      <main className="flex-1">
        <Detail casts={casts.slice(0, 6)} movie={movie} />
      </main>
      <Footer />
    </div>
  );
}
