import Axios from "axios";
import languages from "./languages";

const state = {
  movies: [],
  latestMovie: {},
  trending: [],
  page: null,
  loading: false,
  lists: [
    { link: "now_playing", label: "Now Playing", samples: [] },
    { link: "popular", label: "Popular", samples: [] },
    { link: "top_rated", label: "Top Rated", samples: [] },
    { link: "upcoming", label: "Upcoming", samples: [] },
  ],
};

const mutations = {
  SET_MOVIES(state, { movies }) {
    state.movies = movies;
  },
  SET_TRENDING(state, { movies }) {
    state.trending = movies;
  },
  SET_LATEST_MOVIES(state, { movie }) {
    state.latestMovie = movie;
  },
  SET_MOVIES_PAGE(state, { page }) {
    state.page = page;
  },
  ADD_MOVIES(state, { movies }) {
    state.movies.push(...movies);
  },
  SET_MOVIES_LOADING(state, { loading }) {
    state.loading = loading;
  },
  SET_LIST_SAMPLES(state, { listLink, samples }) {
    let listIndex = state.lists.findIndex((list) => list.link === listLink);
    state.lists[listIndex].samples = samples;
  },
};

const actions = {
  setMoviesLoading: ({ commit }, loading) => {
    commit("SET_MOVIES_LOADING", {
      loading: loading,
    });
  },
  fetchLatestMovie: ({ commit, dispatch }) => {
    dispatch("setMoviesLoading", true);
    let lang = languages.getters.languageCurrent(languages.state);
    Axios.get(
      "/movie/latest?api_key=" +
        process.env.VUE_APP_TMDB_API_KEY +
        "&language=" +
        lang.value
    )
      .then((res) => {
        commit("SET_LATEST_MOVIES", {
          movie: res.data,
        });
        dispatch("setMoviesLoading", false);
      })
      .catch((error) => console.log(error));
  },
  fetchListsData: ({ commit }) => {
    let lang = languages.getters.languageCurrent(languages.state);
    state.lists.forEach((list) => {
      Axios.get(
        "/movie/" +
          list.link +
          "?api_key=" +
          process.env.VUE_APP_TMDB_API_KEY +
          "&language=" +
          lang.value
      )
        .then((res) => {
          commit("SET_LIST_SAMPLES", {
            listLink: list.link,
            samples: res.data.results,
          });
        })
        .catch((error) => console.log(error));
    });
  },
  fetchMovies: ({ commit, dispatch }, [listType, page = 1]) => {
    dispatch("setMoviesLoading", true);
    let lang = languages.getters.languageCurrent(languages.state);
    listType =
      state.lists.find((list) => list.link === listType) === undefined
        ? state.lists[0].link
        : listType;
    Axios.get(
      "/movie/" +
        listType +
        "?api_key=" +
        process.env.VUE_APP_TMDB_API_KEY +
        "&language=" +
        lang.value +
        "&page=" +
        page
    )
      .then((res) => {
        commit(page === 1 ? "SET_MOVIES" : "ADD_MOVIES", {
          movies: res.data.results,
        });
        commit("SET_MOVIES_PAGE", {
          page: res.data.page,
        });
        dispatch("setMoviesLoading", false);
      })
      .catch((error) => console.log(error));
  },
  fetchTrending: ({ commit }) => {
    let lang = languages.getters.languageCurrent(languages.state);
    Axios.get(
      "/trending/movie/day?api_key=" +
        process.env.VUE_APP_TMDB_API_KEY +
        "&language=" +
        lang.value
    )
      .then((res) => {
        commit("SET_TRENDING", {
          movies: res.data.results,
        });
      })
      .catch((error) => console.log(error));
  },
};
const getters = {
  movies: (state) => {
    return state.movies;
  },
  moviesPage: (state) => {
    return state.page;
  },
  moviesLoading: (state) => {
    return state.loading;
  },
  latestMovie: (state) => {
    return state.latestMovie;
  },
  lists: (state) => {
    return state.lists;
  },
  trending: (state) => {
    return state.trending;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
