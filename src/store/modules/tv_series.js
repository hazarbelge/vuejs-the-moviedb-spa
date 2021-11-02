import Axios from "axios";
import languages from "./languages";

const state = {
  tvSeries: [],
  latestTv: {},
  trendingTv: [],
  tvPage: null,
  loading: false,
  tvLists: [
    { link: "airing_today", label: "Airing Today", samples: [] },
    { link: "on_the_air", label: "On The Air", samples: [] },
    { link: "popular", label: "Popular", samples: [] },
    { link: "top_rated", label: "Top Rated", samples: [] },
  ],
};

const mutations = {
  SET_TV_SERIES(state, { tvSeries }) {
    state.tvSeries = tvSeries;
  },
  SET_TV_TRENDING(state, { tvSeries }) {
    state.trendingTv = tvSeries;
  },
  SET_LATEST_TV(state, { tv }) {
    state.latestTv = tv;
  },
  SET_TV_SERIES_PAGE(state, { tvPage }) {
    state.tvPage = tvPage;
  },
  ADD_TV_SERIES(state, { tvSeries }) {
    state.tvSeries.push(...tvSeries);
  },
  SET_TV_SERIES_LOADING(state, { tvLoading }) {
    state.loading = tvLoading;
  },
  SET_TV_LIST_SAMPLES(state, { listLink, samples }) {
    let listIndex = state.tvLists.findIndex((list) => list.link === listLink);
    state.tvLists[listIndex].samples = samples;
  },
};

const actions = {
  setTvSeriesLoading: ({ commit }, tvLoading) => {
    commit("SET_TV_SERIES_LOADING", {
      tvLoading: tvLoading,
    });
  },
  fetchTvListsData: ({ commit }) => {
    let lang = languages.getters.languageCurrent(languages.state);
    state.tvLists.forEach((list) => {
      Axios.get(
        "/tv/" +
          list.link +
          "?api_key=" +
          process.env.VUE_APP_TMDB_API_KEY +
          "&language=" +
          lang.value
      )
        .then((res) => {
          commit("SET_TV_LIST_SAMPLES", {
            listLink: list.link,
            samples: res.data.results,
          });
        })
        .catch((error) => console.log(error));
    });
  },
  fetchTvSeries: ({ commit, dispatch }, [listType, page = 1]) => {
    dispatch("setTvSeriesLoading", true);
    let lang = languages.getters.languageCurrent(languages.state);
    listType =
      state.tvLists.find((list) => list.link === listType) === undefined
        ? state.tvLists[0].link
        : listType;
    Axios.get(
      "/tv/" +
        listType +
        "?api_key=" +
        process.env.VUE_APP_TMDB_API_KEY +
        "&language=" +
        lang.value +
        "&page=" +
        page
    )
      .then((res) => {
        commit(page === 1 ? "SET_TV_SERIES" : "ADD_TV_SERIES", {
          tvSeries: res.data.results,
        });
        commit("SET_TV_SERIES_PAGE", {
          tvPage: res.data.page,
        });
        dispatch("setTvSeriesLoading", false);
      })
      .catch((error) => console.log(error));
  },
  fetchLatestTv: ({ commit, dispatch }) => {
    dispatch("setTvSeriesLoading", true);
    let lang = languages.getters.languageCurrent(languages.state);
    Axios.get(
      "/tv/latest?api_key=" +
        process.env.VUE_APP_TMDB_API_KEY +
        "&language=" +
        lang.value
    )
      .then((res) => {
        commit("SET_LATEST_TV", {
          tv: res.data,
        });
        dispatch("setTvSeriesLoading", false);
      })
      .catch((error) => console.log(error));
  },
  fetchTrendingTv: ({ commit }) => {
    let lang = languages.getters.languageCurrent(languages.state);
    Axios.get(
      "/trending/tv/week?api_key=" +
        process.env.VUE_APP_TMDB_API_KEY +
        "&language=" +
        lang.value
    )
      .then((res) => {
        commit("SET_TV_TRENDING", {
          tvSeries: res.data.results,
        });
      })
      .catch((error) => console.log(error));
  },
};
const getters = {
  tvSeries: (state) => {
    return state.tvSeries;
  },
  tvPage: (state) => {
    return state.tvPage;
  },
  tvSeriesLoading: (state) => {
    return state.loading;
  },
  latestTv: (state) => {
    return state.latestTv;
  },
  tvLists: (state) => {
    return state.tvLists;
  },
  trendingTv: (state) => {
    return state.trendingTv;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
