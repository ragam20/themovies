type TVDetailPageProps = {
  params: Promise<{
    id: string | number;
    slug: string;
  }>;
};
export default async function TVDetailPage({ params }: TVDetailPageProps) {
  const { id, slug } = await params;
  return (
    <div className="text-white text-4xl">
      {id}-{slug}
    </div>
  );
}
