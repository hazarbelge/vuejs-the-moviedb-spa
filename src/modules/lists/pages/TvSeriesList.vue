<template>
  <DefaultLayout>
    <div class="tv-series-list">
      <div class="flex flex-wrap mx-12 justify-between">
        <TvPreview
          v-for="(tv, index) in tvSeries"
          v-bind:key="index"
          v-bind:tv="tv"
          class="w-1/3 sm:w-full lg:w-1/3 flex mb-16 px-4"
        ></TvPreview>
      </div>
      <div v-if="!tvSeriesLoading" class="text-center my-6">
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
import PurpleSpinner from "../../../components/general/PurpleSpinner";
import TvPreview from "../../../components/general/TvPreview";
import DefaultLayout from "../../../pages/DefaultLayout";

export default {
  name: "TvSeriesList",
  computed: {
    ...mapGetters(["tvSeries", "languageCurrent", "tvPage", "tvSeriesLoading"]),
  },
  methods: {
    ...mapActions({
      fetchTvSeries: "fetchTvSeries",
    }),
    loadNextPage() {
      this.fetchTvSeries([this.$route.params.listType, this.tvPage + 1]);
    },
  },
  watch: {
    languageCurrent: function () {
      this.fetchTvSeries([this.$route.params.listType]);
    },
  },
  created() {
    this.fetchTvSeries([this.$route.params.listType]);
  },
  components: {
    DefaultLayout,
    TvPreview,
    PurpleSpinner,
  },
};
</script>

<style></style>
