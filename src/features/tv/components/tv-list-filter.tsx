"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  getTVListQueryOptions,
  TVListFilterInput,
  TVListKey,
} from "../query/get-tv-list";
import { FormEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cn, createSlug } from "@/lib/utils";
import { AppPagination } from "@/components/ui/pagination/app-pagination";
import { Star } from "lucide-react";
import { TVShowList } from "@/types/tv";
import Image from "next/image";
import { paths } from "@/config/paths";
import { publicEnv } from "@/config/public-env";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TVListFilterProps = {
  classname?: string;
  listType: TVListKey;
  initialFilter: TVListFilterInput;
};
export const TVListFilter = ({
  classname,
  listType,
  initialFilter,
}: TVListFilterProps) => {
  const router = useRouter();
  const [filter, setFilter] = useState(initialFilter);

  const tvQuery = useQuery(getTVListQueryOptions(listType, filter));

  const pathname = usePathname();
  const tvs = tvQuery.data?.results ?? [];
  const totalPage = Math.min(tvQuery.data?.total_pages ?? 1, 10);
  const hasTVs = tvs.length > 0;

  const updateFilter = (nextFilter: TVListFilterInput) => {
    const params = new URLSearchParams();

    if (nextFilter.page > 1) {
      params.set("page", String(nextFilter.page));
    }

    if (nextFilter.minDate) {
      params.set("minDate", nextFilter.minDate);
    }

    if (nextFilter.maxDate) {
      params.set("maxDate", nextFilter.maxDate);
    }

    setFilter(nextFilter);

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const applyDateFilter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const minDate = String(formData.get("minDate") ?? "");
    const maxDate = String(formData.get("maxDate") ?? "");

    updateFilter({
      page: 1,
      minDate: minDate || undefined,
      maxDate: maxDate || undefined,
    });
  };

  const clearDateFilter = () => {
    updateFilter({ page: 1 });
  };

  if (tvQuery.isError) {
    return (
      <div className={cn("rounded-md border border-red-400/40 p-4", classname)}>
        <p className="text-sm font-semibold text-red-200">
          Failed to load movies.
        </p>
      </div>
    );
  }

  return (
    <div>
      <form
        key={`${filter.minDate ?? ""}-${filter.maxDate ?? ""}`}
        onSubmit={applyDateFilter}
        className="flex flex-wrap items-end gap-3 rounded-md border border-white/10 bg-white/5 p-3"
      >
        <label className="flex flex-col gap-1 text-xs font-semibold text-white/70">
          Release From
          <Input
            type="date"
            name="minDate"
            defaultValue={filter.minDate ?? ""}
            className="w-40 text-white scheme-dark"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold text-white/70">
          Release To
          <Input
            type="date"
            name="maxDate"
            defaultValue={filter.maxDate ?? ""}
            className="w-40 text-white scheme-dark"
          />
        </label>
        <Button type="submit" className="rounded-sm bg-primary text-white">
          Apply
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={clearDateFilter}
          className="rounded-sm border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
        >
          Clear
        </Button>
      </form>

      <div className="mt-6 flex-1">
        {tvQuery.isLoading ? (
          <div className="mx-auto w-fit rounded-md border border-white/20 px-3 py-2">
            <p className="text-sm font-bold text-white">Loading movies...</p>
          </div>
        ) : !hasTVs ? (
          <div className="mx-auto w-fit rounded-md border border-white/20 px-3 py-2">
            <p className="text-sm font-bold text-white">empty movies.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {tvs.map((tv: TVShowList) => {
              return (
                <li key={tv.id} className="cursor-pointer flex flex-col gap-2">
                  <div
                    onClick={() =>
                      router.push(
                        paths.tv.detail.getHref(tv.id, createSlug(tv.name)),
                      )
                    }
                    className="relative aspect-5/7 w-full max-w-50 transition-all duration-300 hover:scale-105 hover:z-10"
                  >
                    <Image
                      src={`${publicEnv.TMDB_BASE_IMG_URL}/original${tv.poster_path}`}
                      fill
                      className="rounded-md object-cover"
                      alt={`tv poster ${tv.name}`}
                    />
                  </div>

                  <div className="mt-2 flex flex-col gap-1">
                    <h4 className="text-white text-sm font-bold truncate">
                      {tv.name}
                    </h4>
                    <div className="text-sm flex gap-2 items-center">
                      <p className="text-white">
                        {(tv.vote_average / 2).toFixed(1)}
                        {"/5"}
                      </p>
                      <Star
                        fill="#e6b917"
                        size={18}
                        className="text-transparent"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <AppPagination
        totalPage={totalPage}
        page={filter.page}
        onPageChange={(page) => {
          updateFilter({ ...filter, page });
        }}
      />
    </div>
  );
};
