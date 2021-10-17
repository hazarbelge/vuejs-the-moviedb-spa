<template>
  <div class="youtube-iframe">
    <div class="w-full">
      <iframe
        class="w-full"
        height="400"
        :src="'https://www.youtube.com/embed/' + video.key"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "YouTube",
  props: ["video"],
};
</script>

<style></style>
