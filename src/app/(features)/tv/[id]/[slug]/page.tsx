import { Footer } from "@/components/footer";
import { getCredits } from "@/features/tv/api/get-credits";
import { getTVShowDetail } from "@/features/tv/api/get-detail";
import { Detail } from "@/features/tv/components/tv-detail";

type TVDetailPageProps = {
  params: Promise<{
    id: string | number;
    slug: string;
  }>;
};
export default async function TVDetailPage({ params }: TVDetailPageProps) {
  const { id } = await params;

  const [casts, tv] = await Promise.all([
    await getCredits(id),
    await getTVShowDetail({ id: id }),
  ]);

  return (
    <div className="flex flex-col overflow-hidden">
      <main>
        <Detail tv={tv} casts={casts.slice(0, 6)} />
      </main>
      <Footer />
    </div>
  );
}
