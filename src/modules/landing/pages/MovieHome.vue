<template>
  <DefaultLayout>
    <div class="movie-home">
      <MovieHomeTrendingTitle />
      <MovieHomeTrendingCarousel />
      <MovieHomeLatestTitle />
      <MovieHomeLatestMovie />
    </div>
  </DefaultLayout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DefaultLayout from "../../../pages/DefaultLayout";
import MovieHomeTrendingTitle from "../../../components/landing/movie_home/MovieHomeTrendingTitle";
import MovieHomeTrendingCarousel from "../../../components/landing/movie_home/MovieHomeTrendingCarousel";
import MovieHomeLatestTitle from "../../../components/landing/movie_home/MovieHomeLatestTitle";
import MovieHomeLatestMovie from "../../../components/landing/movie_home/MovieHomeLatestMovie";

export default {
  name: "MovieHome",
  computed: {
    ...mapGetters(["languageCurrent", "latestMovie", "moviesLoading"]),
  },
  methods: {
    ...mapActions({
      fetchLatestMovie: "fetchLatestMovie",
    }),
  },
  watch: {
    languageCurrent: function () {
      this.fetchLatestMovie();
    },
  },
  created() {
    this.fetchLatestMovie();
  },
  components: {
    MovieHomeLatestMovie,
    MovieHomeLatestTitle,
    MovieHomeTrendingCarousel,
    MovieHomeTrendingTitle,
    DefaultLayout,
  },
};
</script>
