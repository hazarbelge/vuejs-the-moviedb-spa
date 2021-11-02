import Movie from "./pages/Movie";
import Tv from "./pages/Tv";

export default [
  {
    path: "/movie/:id",
    name: "Movie",
    component: Movie,
  },
  {
    path: "/tv/:id",
    name: "Tv",
    component: Tv,
  },
];
