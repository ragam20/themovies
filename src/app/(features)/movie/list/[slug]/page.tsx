type MovieListPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function MovieListPage({ params }: MovieListPageProps) {
  const { slug } = await params;

  return <div className="text-4xl text-white">Hello {slug}</div>;
}
