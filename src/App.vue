<template>
  <div id="app" class="bg-black min-h-screen">
    <div class="bg-purple-900 shadow-md mb-4">
      <div class="container mx-auto">
        <nav class="flex items-center justify-between flex-wrap p-3">
          <div class="flex justify-around">
            <img
              class="w-16 h-16"
              src="../public/moviedb_logo.png"
              width="400"
              height="400"
              alt="themoviedb_logo"
            />
            <div
              class="
                pl-4
                flex
                w-full
                sm:w-auto
                mb-2
                items-center
                flex-shrink-0
                text-white
              "
            >
              <span class="font-bold text-xl tracking-tight m-auto"
                >The Movie DB API - VueJS</span
              >
            </div>
          </div>
          <div class="hidden md:flex flex w-1/2 sm:w-auto justify-center">
            <router-link to="/" class="hover:text-pink-400 text-white p-2" exact
              >Home
            </router-link>
            <router-link
              to="/categories"
              class="hover:text-pink-400 text-white p-2"
              exact
              >Categories
            </router-link>
          </div>
          <div class="flex-col">
            <div class="md:hidden flex items-center">
              <button
                class="outline-none mobile-menu-button"
                @click="openMobileNavMenu"
              >
                <svg
                  class="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
            <div
              v-if="mobileMenuOpened"
              class="
                absolute
                right-0
                w-25
                mt-2
                origin-top-right
                rounded-md
                shadow-lg
                md:w-48
              "
            >
              <div
                class="
                  px-2
                  py-2
                  bg-white
                  rounded-md
                  shadow
                  dark-mode:bg-gray-800
                "
              >
                <ul class="">
                  <li>
                    <router-link
                      to="/"
                      class="hover:text-pink-400 text-black p-2"
                      exact
                      >Home
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/categories"
                      class="hover:text-pink-400 text-black p-2"
                      exact
                      >Categories
                    </router-link>
                  </li>
                  <li>
                    <div class="flex w-1/2 sm:w-auto justify-center">
                      <select
                        @change="updateCurrentLanguage($event)"
                        class="
                          text-center
                          appearance-none
                          bg-gray-200
                          border border-pink-300
                          hover:bg-pink-100
                          text-gray-700
                          p-1
                          rounded
                          focus:outline-none
                          focus:bg-gray-200
                          focus:border-gray-500
                        "
                      >
                        <option
                          v-for="(language, index) in languageList"
                          :value="language.value"
                          :key="index"
                          :selected="language.value === languageCurrent.value"
                        >
                          {{ language.label }}
                        </option>
                      </select>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="hidden md:flex flex w-1/2 sm:w-auto justify-center">
            <select
              @change="updateCurrentLanguage($event)"
              class="
                text-center
                appearance-none
                bg-gray-200
                border border-pink-300
                hover:bg-pink-100
                text-gray-700
                p-1
                rounded
                focus:outline-none focus:bg-gray-200 focus:border-gray-500
              "
            >
              <option
                v-for="(language, index) in languageList"
                :value="language.value"
                :key="index"
                :selected="language.value === languageCurrent.value"
              >
                {{ language.label }}
              </option>
            </select>
          </div>
        </nav>
      </div>
    </div>
    <div class="container mx-auto px-3 pb-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

const App = {
  name: "App",
  data() {
    return {
      mobileMenuOpened: false,
    };
  },
  computed: {
    ...mapGetters(["languageCurrent", "languageList"]),
  },
  methods: {
    ...mapActions({
      changeCurrentLanguage: "changeCurrentLanguage",
      fetchLanguages: "fetchLanguages",
    }),
    updateCurrentLanguage(event) {
      this.changeCurrentLanguage(event.target.value);
    },
    openMobileNavMenu() {
      this.mobileMenuOpened = !this.mobileMenuOpened;
    },
  },
  created() {
    this.fetchLanguages();
  },
};

export default App;
</script>
