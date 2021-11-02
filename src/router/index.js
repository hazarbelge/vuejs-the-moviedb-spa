import Vue from "vue";
import VueRouter from "vue-router";

import MovieHome from "../views/MovieHome.vue";
import MovieCategories from "../views/MovieCategories.vue";
import MoviesList from "../views/MoviesList.vue";
import Movie from "../views/Movie.vue";

import TvSeriesCategories from "../views/TvSeriesCategories.vue";
import TvSeriesList from "../views/TvSeriesList.vue";
import Tv from "../views/Tv.vue";
import TvHome from "../views/TvHome.vue";

Vue.use(VueRouter);

const routes = [
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
    path: "/movie_categories/:listType",
    name: "MoviesList",
    component: MoviesList,
  },
  {
    path: "/movie/:id",
    name: "Movie",
    component: Movie,
  },
  {
    path: "/tv_series_categories",
    name: "TvSeriesCategories",
    component: TvSeriesCategories,
  },
  {
    path: "/tv_series_categories/:listType",
    name: "TvSeriesList",
    component: TvSeriesList,
  },
  {
    path: "/tv/:id",
    name: "Tv",
    component: Tv,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
