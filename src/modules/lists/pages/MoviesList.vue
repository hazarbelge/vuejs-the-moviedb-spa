<template>
  <DefaultLayout>
    <div class="movies-list">
      <div class="flex flex-wrap mx-12 justify-between">
        <movie-preview
          v-for="(movie, index) in movies"
          v-bind:key="index"
          v-bind:movie="movie"
          class="w-1/3 sm:w-full lg:w-1/3 flex mb-16 px-4"
        ></movie-preview>
      </div>
      <div v-if="!moviesLoading" class="text-center my-6">
        <button
          @click="loadNextPage"
          class="
            bg-purple-700
            hover:bg-purple-500
            text-white
            font-bold
            py-2
            px-4
            border-b-4 border-purple-800
            hover:border-purple-600
            rounded
            inline-block
            align-middle
          "
        >
          Load More
        </button>
      </div>
      <div v-else class="text-center my-6">
        <purple-spinner> </purple-spinner>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MoviePreview from "../../../components/general/MoviePreview.vue";
import PurpleSpinner from "../../../components/general/PurpleSpinner";
import DefaultLayout from "../../../pages/DefaultLayout";

export default {
  name: "MoviesList",
  computed: {
    ...mapGetters(["movies", "languageCurrent", "moviesPage", "moviesLoading"]),
  },
  methods: {
    ...mapActions({
      fetchMovies: "fetchMovies",
    }),
    loadNextPage() {
      this.fetchMovies([this.$route.params.listType, this.moviesPage + 1]);
    },
  },
  watch: {
    languageCurrent: function () {
      this.fetchMovies([this.$route.params.listType]);
    },
  },
  created() {
    this.fetchMovies([this.$route.params.listType]);
  },
  components: {
    DefaultLayout,
    PurpleSpinner,
    MoviePreview,
  },
};
</script>

<style></style>
