<template>
  <div>
    <latest-movie v-if="!moviesLoading" :movie="latestMovie"></latest-movie>
    <div v-else class="text-center my-6">
      <purple-spinner></purple-spinner>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LatestMovie from "./LatestMovie";
import PurpleSpinner from "../../general/PurpleSpinner";

export default {
  name: "MovieHomeLatestMovie",
  components: { LatestMovie, PurpleSpinner },
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
};
</script>
