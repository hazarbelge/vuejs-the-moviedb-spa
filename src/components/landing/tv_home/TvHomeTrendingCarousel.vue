<template>
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
</template>
<script>
import TvPreview from "../../general/TvPreview.vue";
import { mapActions, mapGetters } from "vuex";
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "TvHomeTrendingCarousel",
  components: {
    TvPreview,
    Carousel,
    Slide,
  },
  computed: {
    ...mapGetters(["languageCurrent", "trendingTv"]),
  },
  methods: {
    ...mapActions({
      fetchTrendingTv: "fetchTrendingTv",
    }),
  },
  watch: {
    languageCurrent: function () {
      this.fetchTrendingTv();
    },
  },
  created() {
    this.fetchTrendingTv();
  },
};
</script>
