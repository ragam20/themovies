export const paths = {
  movie: {
    path: "/",
    getHref: () => paths.movie.path,
  },
  tv: {
    path: "/tv",
    getHref: () => paths.tv.path,
  },
};
