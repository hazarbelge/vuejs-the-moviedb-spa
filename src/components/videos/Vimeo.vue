<template>
  <div class="vimeo-iframe">
    <iframe
      :src="'https://player.vimeo.com/video/' + video.key"
      class="w-full"
      height="400"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "Vimeo",
  props: ["video"],
};
</script>

<style></style>
