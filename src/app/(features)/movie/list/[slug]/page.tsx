import { Footer } from "@/components/footer";
import { paths } from "@/config/paths";
import {
  getMovieListKeyBySlug,
  movieListMap,
  type MovieListFilterInput,
} from "@/features/movie/query/get-movie-list";
import { getNowPlaying } from "@/features/movie/api/get-now-playing";
import { getPopular } from "@/features/movie/api/get-popular";
import { getUpComing } from "@/features/movie/api/get-up-coming";
import { MovieListFilter } from "@/features/movie/components/movie-list-filter";
import { queryConfig } from "@/lib/react-query";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "The Movies | Movies",
  description: "Movie List",
};

type SearchParams = Record<string, string | string[] | undefined>;

type MovieListPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<SearchParams>;
};

const getSearchValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const isDateValue = (value: string | undefined) => {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));
};

const normalizeMovieListFilter = (
  searchParams: SearchParams,
): MovieListFilterInput => {
  const page = Number(getSearchValue(searchParams.page));
  const minDate = getSearchValue(searchParams.minDate);
  const maxDate = getSearchValue(searchParams.maxDate);

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    minDate: isDateValue(minDate) ? minDate : undefined,
    maxDate: isDateValue(maxDate) ? maxDate : undefined,
  };
};

export default async function MovieListPage({
  params,
  searchParams,
}: MovieListPageProps) {
  const [{ slug }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const key = getMovieListKeyBySlug(slug);

  if (!key) {
    notFound();
  }

  const filter = normalizeMovieListFilter(resolvedSearchParams);
  const queryClient = new QueryClient({ defaultOptions: queryConfig });

  await queryClient.prefetchQuery({
    queryKey: [
      "movie",
      "list",
      key,
      filter.page,
      filter.minDate,
      filter.maxDate,
    ],
    queryFn: () => {
      switch (key) {
        case "now_playing":
          return getNowPlaying(filter);

        case "popular":
          return getPopular(filter);

        case "up_coming":
          return getUpComing(filter);
      }
    },
  });

  return (
    <div className="text-white min-h-screen flex flex-col overflow-hidden">
      <header className="p-4 w-full bg-linear-to-r from-primary/80 to-primary/10">
        <Link href={paths.movie.path}>
          <h1 className="text-2xl font-bold">The Movies</h1>
        </Link>
      </header>

      <main className="mt-10 w-full mx-auto max-w-7xl flex-1 flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <h1 className="font-heading text-4xl">{movieListMap[key].title}</h1>
        </div>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <MovieListFilter
            classname="mt-4"
            listType={key}
            initialFilter={filter}
          />
        </HydrationBoundary>
      </main>

      <Footer />
    </div>
  );
}
