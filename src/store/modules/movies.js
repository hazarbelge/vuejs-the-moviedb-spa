import Axios from "axios";
import languages from "./languages";

const state = {
  movies: [],
  latestMovie: {},
  trendingMovie: [],
  page: null,
  loading: false,
  movieLists: [
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
    state.trendingMovie = movies;
  },
  SET_LATEST_MOVIES(state, { movie }) {
    state.latestMovie = movie;
  },
  SET_MOVIES_PAGE(state, { page }) {
    state.tvPage = page;
  },
  ADD_MOVIES(state, { movies }) {
    state.movies.push(...movies);
  },
  SET_MOVIES_LOADING(state, { loading }) {
    state.loading = loading;
  },
  SET_MOVIE_LIST_SAMPLES(state, { listLink, samples }) {
    let listIndex = state.movieLists.findIndex(
      (list) => list.link === listLink
    );
    state.movieLists[listIndex].samples = samples;
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
  fetchMovieListsData: ({ commit }) => {
    let lang = languages.getters.languageCurrent(languages.state);
    state.movieLists.forEach((list) => {
      Axios.get(
        "/movie/" +
          list.link +
          "?api_key=" +
          process.env.VUE_APP_TMDB_API_KEY +
          "&language=" +
          lang.value
      )
        .then((res) => {
          commit("SET_MOVIE_LIST_SAMPLES", {
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
      state.movieLists.find((list) => list.link === listType) === undefined
        ? state.movieLists[0].link
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
  fetchTrendingMovie: ({ commit }) => {
    let lang = languages.getters.languageCurrent(languages.state);
    Axios.get(
      "/trending/movie/week?api_key=" +
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
    return state.tvPage;
  },
  moviesLoading: (state) => {
    return state.loading;
  },
  latestMovie: (state) => {
    return state.latestMovie;
  },
  movieLists: (state) => {
    return state.movieLists;
  },
  trendingMovie: (state) => {
    return state.trendingMovie;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
