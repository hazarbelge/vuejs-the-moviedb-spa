import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/categories",
    name: "Movies",
    component: () => import("../views/Categories.vue"),
  },
  {
    path: "/categories/:listType",
    name: "MoviesList",
    component: () => import("../components/movies/MoviesList.vue"),
  },
  {
    path: "/movie/:id",
    name: "Movie",
    component: () => import("../views/Movie.vue"),
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
