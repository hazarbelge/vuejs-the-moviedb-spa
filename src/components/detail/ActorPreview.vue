<template>
  <div class="w-1/3 sm:w-1/3 md:w-1/4 lg:w-1/5 flex my-1 p-1">
    <clazy-load
      :src="imageChecker(actor.profile_path)"
      loadedClass="w-1/4 pr-1"
      loadingClass="w-1/4 pr-1"
    >
      <img :src="imageChecker(actor.profile_path)" :alt="actor.name" />
      <div slot="placeholder" class="flex justify-center h-full">
        <purple-spinner> </purple-spinner>
      </div>
    </clazy-load>
    <div class="w-3/4 text-sm pl-1">
      <span class="font-bold text-white">{{ actor.name }}</span>
      <span
        v-if="emptyStringChecker(actor.character)"
        class="italic text-gray-400"
      >
        as {{ actor.character }}</span
      >
    </div>
  </div>
</template>

<script>
import { imageChecker, emptyStringChecker } from "@/mixins";
import PurpleSpinner from "../general/PurpleSpinner";

export default {
  name: "ActorPreview",
  props: ["actor"],
  mixins: [imageChecker, emptyStringChecker],
  components: {
    PurpleSpinner,
  },
};
</script>

<style></style>
