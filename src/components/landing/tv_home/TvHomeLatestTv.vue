<template>
  <div>
    <LatestTv v-if="!tvSeriesLoading" :tv="latestTv"></LatestTv>
    <div v-else class="text-center my-6">
      <purple-spinner></purple-spinner>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import LatestTv from "./LatestTv.vue";
import PurpleSpinner from "../../general/PurpleSpinner.vue";

export default {
  name: "TvHomeLatestTv",
  components: {
    LatestTv,
    PurpleSpinner,
  },
  computed: {
    ...mapGetters(["languageCurrent", "latestTv", "tvSeriesLoading"]),
  },
  methods: {
    ...mapActions({
      fetchLatestTv: "fetchLatestTv",
    }),
  },
  watch: {
    languageCurrent: function () {
      this.fetchLatestTv();
    },
  },
  created() {
    this.fetchLatestTv();
  },
};
</script>
