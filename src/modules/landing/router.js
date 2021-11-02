import MovieHome from "./pages/MovieHome";
import TvHome from "./pages/TvHome";
import MovieCategories from "./pages/MovieCategories";
import TvSeriesCategories from "./pages/TvSeriesCategories";

export default [
  {
    path: "/",
    name: "MovieHome",
    component: MovieHome,
  },
  {
    path: "/tv_home",
    name: "TvHome",
    component: TvHome,
  },
  {
    path: "/movie_categories",
    name: "MovieCategories",
    component: MovieCategories,
  },
  {
    path: "/tv_series_categories",
    name: "TvSeriesCategories",
    component: TvSeriesCategories,
  },
];
