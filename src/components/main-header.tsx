"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { paths } from "@/config/paths";
import { usePathname } from "next/navigation";
import { removeListener } from "process";

type MenuItem = {
  key: string;
  title: string;
  href: string;
};

const menuItems: MenuItem[] = [
  {
    key: "movie",
    title: "Movies",
    href: paths.movie.getHref(),
  },
  {
    key: "tv",
    title: "TV Shows",
    href: paths.tv.getHref(),
  },
];

export const MainHeader = ({ classname }: { classname?: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      removeListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed flex flex-wrap md:flex-nowrap justify-between p-4 items-center z-50 transition-all duration-300 backdrop-blur-2xl",
        isScrolled
          ? "w-full md:top-0 md:left-0 md:w-full rounded-none md:px-4 py-2"
          : "w-full md:top-12 md:left-1/2 md:w-160 md:-translate-x-1/2 rounded-md bg-transparent",
        classname,
      )}
    >
      <h2 className="my-2 md:my-0  font-heading text-white font-bold text-2xl">
        The Movies
      </h2>
      <nav
        className={`flex text-white font-sans items-center gap-2 ${isScrolled ? "md:gap-8" : ""}`}
      >
        {menuItems.map((item) => {
          const isActive =
            item.href === "/" ? "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`text-white text-sm font-bold ${isActive ? "rounded-sm py-1 px-2 bg-red-800" : ""}`}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
      <div className="flex gap-2">
        <Input
          value={search}
          onChange={(v) => setSearch(v.target.value)}
          className="flex-1 rounded-xs text-white"
          placeholder={`Search movie or tv show ...`}
        />
        <Button className="rounded-sm cursor-pointer" onClick={() => undefined}>
          Search
        </Button>
      </div>
    </header>
  );
};
