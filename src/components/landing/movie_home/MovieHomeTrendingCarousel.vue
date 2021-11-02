<template>
  <div>
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
        <MoviePreview :movie="movie"></MoviePreview>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import MoviePreview from "../../general/MoviePreview";

export default {
  name: "MovieHomeTrendingCarousel",
  components: {
    MoviePreview,
    Carousel,
    Slide,
  },
  computed: {
    ...mapGetters(["languageCurrent", "trendingMovie"]),
  },
  methods: {
    ...mapActions({
      fetchTrendingMovie: "fetchTrendingMovie",
    }),
  },
  watch: {
    languageCurrent: function () {
      this.fetchTrendingMovie();
    },
  },
  created() {
    this.fetchTrendingMovie();
  },
};
</script>
