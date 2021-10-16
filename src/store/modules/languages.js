import Axios from "axios";

const state = {
  current: {},
  list: [],
};

const mutations = {
  SET_CURRENT_LANGUAGE(state, { lang }) {
    state.current = state.list.find((langs) => langs.value === lang);
  },
  SET_LANGUAGES(state, { languages }) {
    languages.forEach((language) => {
      state.list.push({
        label: language.english_name,
        value: language.iso_639_1,
      });
    });
  },
};

const actions = {
  changeCurrentLanguage: ({ commit }, lang) => {
    commit("SET_CURRENT_LANGUAGE", {
      lang,
    });
  },
  fetchLanguages: ({ commit, dispatch }) => {
    Axios.get(
      "/configuration/languages?api_key=" + process.env.VUE_APP_TMDB_API_KEY
    )
      .then((res) => {
        commit("SET_LANGUAGES", {
          languages: res.data,
        });
      })
      .then(() => {
        dispatch("changeCurrentLanguage", "en");
      })
      .catch((error) => console.log(error));
  },
};
const getters = {
  languageCurrent: (state) => {
    return state.current;
  },
  languageList: (state) => {
    return state.list.sort((a, b) => (a.label > b.label ? 1 : -1));
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
