<template>
  <div class="movie-home">
    <div
      class="
        mb-4
        pb-1
        border-b border-gray-400 border-gray-400
        text-2xl
        font-bold
        text-white
      "
    >
      Trending Now
    </div>
    <carousel
      class="-mx-2 mb-8"
      :autoplay="!0"
      :autoplayTimeout="3000"
      :autoplayHoverPause="!0"
      :paginationPadding="6"
      paginationColor="#cbd5e0"
      paginationActiveColor="#44337a"
    >
      <slide v-for="(movie, index) in trendingMovie" :key="index" class="flex">
        <movie-preview :movie="movie"></movie-preview>
      </slide>
    </carousel>
    <div
      v-if="!moviesLoading"
      class="
        mb-4
        pb-1
        border-b border-gray-400 border-gray-400
        text-2xl
        font-bold
        text-white
      "
    >
      Latest Movie
    </div>
    <latest-movie v-if="!moviesLoading" :movie="latestMovie"></latest-movie>
    <div v-else class="text-center my-6">
      <purple-spinner> </purple-spinner>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import MoviePreview from "../components/movies/MoviePreview";
import PurpleSpinner from "../components/loader/PurpleSpinner";
import LatestMovie from "../components/movies/LatestMovie";

export default {
  name: "MovieHome",
  computed: {
    ...mapGetters([
      "languageCurrent",
      "trendingMovie",
      "latestMovie",
      "moviesLoading",
    ]),
  },
  methods: {
    ...mapActions({
      fetchLatestMovie: "fetchLatestMovie",
      fetchTrendingMovie: "fetchTrendingMovie",
    }),
  },
  watch: {
    languageCurrent: function () {
      this.fetchTrendingMovie();
      this.fetchLatestMovie();
    },
  },
  created() {
    this.fetchTrendingMovie();
    this.fetchLatestMovie();
  },
  components: {
    Carousel,
    Slide,
    MoviePreview,
    LatestMovie,
    PurpleSpinner,
  },
};
</script>
