import Vue from "vue";
import Vuex from "vuex";

import languages from "./modules/languages";
import movies from "./modules/movies";
import movie from "./modules/movie";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    languages,
    movies,
    movie,
  },
});

export default store;
