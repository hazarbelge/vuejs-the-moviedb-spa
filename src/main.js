import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { charactersLimiter, imdbLink } from "./filter";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import VueClazyLoad from "vue-clazy-load";

Vue.use(VueClazyLoad);

library.add(fas);

Vue.component("font-awesome-icon", FontAwesomeIcon);

import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;

import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

Vue.filter("charactersLimiter", charactersLimiter);
Vue.filter("imdbLink", imdbLink);

new Vue({
  router,
  store,
  render: (render) => render(App),
}).$mount("#app");
