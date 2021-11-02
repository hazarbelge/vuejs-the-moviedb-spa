import Vue from "vue";
import Vuex from "vuex";

import languages from "./modules/languages";
import movies from "./modules/movies";
import movie from "./modules/movie";
import tvSeries from "./modules/tv_series";
import tv from "./modules/tv";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    languages,
    movies,
    movie,
    tvSeries,
    tv,
  },
});

export default store;
