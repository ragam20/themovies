export const paths = {
  movie: {
    path: "/",
    getHref: () => paths.movie.path,

    detail: {
      path: "/movie/[id]/[slug]",
      getHref: (id: number | string, slug: string) => `/movie/${id}/${slug}`,
    },

    list: {
      path: "/movie/list/[slug]",
      getHref: (slug: string) => `/movie/list/${slug}`,
    },
  },
  tv: {
    path: "/tv",
    getHref: () => paths.tv.path,

    detail: {
      path: "/tv/[id]/[slug]",
      getHref: (id: number | string, slug: string) => `/tv/${id}/${slug}`,
    },

    list: {
      path: "/tv/list/[slug]",
      getHref: (slug: string) => `/tv/list/${slug}`,
    },
  },
};
