import { Footer } from "@/components/footer";
import { paths } from "@/config/paths";
import { getAiringToday } from "@/features/tv/api/get-airing-today";
import { getOnTheAir } from "@/features/tv/api/get-on-the-air";
import { getPopular } from "@/features/tv/api/get-popular";
import { TVListFilter } from "@/features/tv/components/tv-list-filter";
import {
  getTVListKeyBySlug,
  TVListFilterInput,
  tvListMap,
} from "@/features/tv/query/get-tv-list";
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
  title: "The Movies | TV Shows",
  description: "TV List",
};

type SearchParams = Record<string, string | string[] | undefined>;

const getSearchValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const isDateValue = (value: string | undefined) => {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));
};

const normalizeTVListFilter = (
  searchParams: SearchParams,
): TVListFilterInput => {
  const page = Number(getSearchValue(searchParams.page));
  const minDate = getSearchValue(searchParams.minDate);
  const maxDate = getSearchValue(searchParams.maxDate);

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    minDate: isDateValue(minDate) ? minDate : undefined,
    maxDate: isDateValue(maxDate) ? maxDate : undefined,
  };
};

type ListpageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<SearchParams>;
};
export default async function ListPage({
  params,
  searchParams,
}: ListpageProps) {
  const [{ slug }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const key = getTVListKeyBySlug(slug);

  if (!key) {
    notFound();
  }

  const filter = normalizeTVListFilter(resolvedSearchParams);
  const queryClient = new QueryClient({ defaultOptions: queryConfig });

  await queryClient.prefetchQuery({
    queryKey: ["tv", "list", key, filter.page, filter.minDate, filter.maxDate],
    queryFn: () => {
      switch (key) {
        case "popular":
          return getPopular(filter);
        case "airing_today":
          return getAiringToday(filter);
        case "on_the_air":
          return getOnTheAir(filter);
      }
    },
  });

  return (
    <div className="text-white min-h-screen flex flex-col overflow-hidden">
      <header className="p-4 w-full bg-linear-to-r from-primary/80 to-primary/10">
        <Link href={paths.tv.path}>
          <h1 className="text-2xl font-bold">The Movies</h1>
        </Link>
      </header>

      <main className="mt-10 w-full mx-auto max-w-7xl flex-1 flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <h1 className="font-heading text-4xl">{tvListMap[key].title}</h1>
        </div>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <TVListFilter
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
