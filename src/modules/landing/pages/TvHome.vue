<template>
  <DefaultLayout>
    <div class="tv-home">
      <TvHomeTrendingTitle />
      <TvHomeTrendingCarousel />
      <TvHomeLatestTitle />
      <TvHomeLatestTv />
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../../../pages/DefaultLayout";
import TvHomeTrendingCarousel from "../../../components/landing/tv_home/TvHomeTrendingCarousel";
import TvHomeTrendingTitle from "../../../components/landing/tv_home/TvHomeTrendingTitle";
import TvHomeLatestTitle from "../../../components/landing/tv_home/TvHomeLatestTitle";
import TvHomeLatestTv from "../../../components/landing/tv_home/TvHomeLatestTv";

export default {
  name: "TvHome",
  components: {
    TvHomeLatestTv,
    TvHomeLatestTitle,
    TvHomeTrendingTitle,
    TvHomeTrendingCarousel,
    DefaultLayout,
  },
};
</script>
