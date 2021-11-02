<template>
  <div class="tv-home">
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
      <slide v-for="(tv, index) in trendingTv" :key="index" class="flex">
        <TvPreview :tv="tv"></TvPreview>
      </slide>
    </carousel>
    <div
      v-if="!tvSeriesLoading"
      class="
        mb-4
        pb-1
        border-b border-gray-400 border-gray-400
        text-2xl
        font-bold
        text-white
      "
    >
      Latest Tv
    </div>
    <LatestTv v-if="!tvSeriesLoading" :tv="latestTv"></LatestTv>
    <div v-else class="text-center my-6">
      <purple-spinner> </purple-spinner>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import TvPreview from "../components/tv_series/TvPreview.vue";
import PurpleSpinner from "../components/loader/PurpleSpinner.vue";
import LatestTv from "../components/tv_series/LatestTv.vue";

export default {
  name: "TvHome",
  computed: {
    ...mapGetters([
      "languageCurrent",
      "trendingTv",
      "latestTv",
      "tvSeriesLoading",
    ]),
  },
  methods: {
    ...mapActions({
      fetchLatestTv: "fetchLatestTv",
      fetchTrendingTv: "fetchTrendingTv",
    }),
  },
  watch: {
    languageCurrent: function () {
      this.fetchTrendingTv();
      this.fetchLatestTv();
    },
  },
  created() {
    this.fetchTrendingTv();
    this.fetchLatestTv();
  },
  components: {
    TvPreview,
    LatestTv,
    Carousel,
    Slide,
    PurpleSpinner,
  },
};
</script>
