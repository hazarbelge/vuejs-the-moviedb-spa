import Axios from "axios";
import languages from "./languages";

const state = {
  tv: [],
  tvCredits: {
    cast: [],
  },
  tvLoading: false,
  tvVideos: [],
  tvVideosLoad: false,
};

const mutations = {
  SET_TV(state, { tv }) {
    state.tv = tv;
  },
  SET_TV_CREDITS(state, { tvCredits }) {
    state.tvCredits = tvCredits;
  },
  SET_TV_LOADING(state, { tvLoading }) {
    state.tvLoading = tvLoading;
  },
  SET_TV_VIDEOS(state, { videos }) {
    state.tvVideos = videos;
  },
  SET_TV_VIDEOS_LOADING(state, { videosLoad }) {
    state.tvVideosLoad = videosLoad;
  },
};

const actions = {
  setTvLoading: ({ commit }, tvLoading) => {
    commit("SET_TV_LOADING", {
      tvLoading: tvLoading,
    });
  },
  setTvVideosLoad: ({ commit }, videosLoad) => {
    commit("SET_TV_VIDEOS_LOADING", {
      videosLoad: videosLoad,
    });
  },
  fetchTv: ({ commit, dispatch }, tvId) => {
    dispatch("setTvLoading", true);
    let lang = languages.getters.languageCurrent(languages.state);
    Axios.get(
      "/tv/" +
        tvId +
        "?api_key=" +
        process.env.VUE_APP_TMDB_API_KEY +
        "&language=" +
        lang.value
    )
      .then((res) => {
        commit("SET_TV", {
          tv: res.data,
        });
        commit("SET_TV_VIDEOS", {
          videos: [],
        });
        dispatch("fetchTvCredits", tvId);
        dispatch("setTvLoading", false);
        dispatch("setTvVideosLoad", false);
      })
      .catch((error) => console.log(error));
  },
  fetchTvCredits: ({ commit }, tvId) => {
    let lang = languages.getters.languageCurrent(languages.state);
    Axios.get(
      "/tv/" +
        tvId +
        "/credits?api_key=" +
        process.env.VUE_APP_TMDB_API_KEY +
        "&language=" +
        lang.value
    )
      .then((res) => {
        commit("SET_TV_CREDITS", {
          tvCredits: res.data,
        });
      })
      .catch((error) => console.log(error));
  },
  fetchTvVideos: ({ commit, dispatch }, tvId) => {
    let lang = languages.getters.languageCurrent(languages.state);
    Axios.get(
      "/tv/" +
        tvId +
        "/videos?api_key=" +
        process.env.VUE_APP_TMDB_API_KEY +
        "&language=" +
        lang.value
    )
      .then((res) => {
        commit("SET_TV_VIDEOS", {
          videos: res.data.results,
        });
        dispatch("setTvVideosLoad", true);
      })
      .catch((error) => console.log(error));
  },
};
const getters = {
  tv: (state) => {
    return state.tv;
  },
  tvCredits: (state) => {
    return state.tvCredits;
  },
  tvLoading: (state) => {
    return state.tvLoading;
  },
  tvVideos: (state) => {
    return state.tvVideos;
  },
  tvVideosLoad: (state) => {
    return state.tvVideosLoad;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
