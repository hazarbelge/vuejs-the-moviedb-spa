import Axios from "axios";
import languages from "./languages";

const state = {
  movie: [],
  movieCredits: {
    cast: [],
  },
  loading: false,
  videos: [],
  videosLoad: false,
};

const mutations = {
  SET_MOVIE(state, { movie }) {
    state.movie = movie;
  },
  SET_MOVIE_CREDITS(state, { credits }) {
    state.movieCredits = credits;
  },
  SET_MOVIE_LOADING(state, { loading }) {
    state.loading = loading;
  },
  SET_MOVIE_VIDEOS(state, { videos }) {
    state.tvVideos = videos;
  },
  SET_MOVIE_VIDEOS_LOADING(state, { videosLoad }) {
    state.tvVideosLoad = videosLoad;
  },
};

const actions = {
  setMovieLoading: ({ commit }, loading) => {
    commit("SET_MOVIE_LOADING", {
      loading: loading,
    });
  },
  setMovieVideosLoad: ({ commit }, videosLoad) => {
    commit("SET_MOVIE_VIDEOS_LOADING", {
      videosLoad: videosLoad,
    });
  },
  fetchMovie: ({ commit, dispatch }, movieId) => {
    dispatch("setMovieLoading", true);
    let lang = languages.getters.languageCurrent(languages.state);
    Axios.get(
      "/movie/" +
        movieId +
        "?api_key=" +
        process.env.VUE_APP_TMDB_API_KEY +
        "&language=" +
        lang.value
    )
      .then((res) => {
        commit("SET_MOVIE", {
          movie: res.data,
        });
        commit("SET_MOVIE_VIDEOS", {
          videos: [],
        });
        dispatch("fetchMovieCredits", movieId);
        dispatch("setMovieLoading", false);
        dispatch("setMovieVideosLoad", false);
      })
      .catch((error) => console.log(error));
  },
  fetchMovieCredits: ({ commit }, movieId) => {
    let lang = languages.getters.languageCurrent(languages.state);
    Axios.get(
      "/movie/" +
        movieId +
        "/credits?api_key=" +
        process.env.VUE_APP_TMDB_API_KEY +
        "&language=" +
        lang.value
    )
      .then((res) => {
        commit("SET_MOVIE_CREDITS", {
          credits: res.data,
        });
      })
      .catch((error) => console.log(error));
  },
  fetchMovieVideos: ({ commit, dispatch }, movieId) => {
    let lang = languages.getters.languageCurrent(languages.state);
    Axios.get(
      "/movie/" +
        movieId +
        "/videos?api_key=" +
        process.env.VUE_APP_TMDB_API_KEY +
        "&language=" +
        lang.value
    )
      .then((res) => {
        commit("SET_MOVIE_VIDEOS", {
          videos: res.data.results,
        });
        dispatch("setMovieVideosLoad", true);
      })
      .catch((error) => console.log(error));
  },
};
const getters = {
  movie: (state) => {
    return state.movie;
  },
  credits: (state) => {
    return state.movieCredits;
  },
  movieLoading: (state) => {
    return state.loading;
  },
  movieVideos: (state) => {
    return state.tvVideos;
  },
  movieVideosLoad: (state) => {
    return state.tvVideosLoad;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
