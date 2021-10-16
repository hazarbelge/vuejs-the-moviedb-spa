<template>
  <div
    id="PurpleSpinner"
    class="
      bg-purple-600
      hover:bg-purple-500
      text-white
      py-2
      px-4
      hover:border-purple-600
      rounded
      text-2xl
      inline-block
    "
  >
    <font-awesome-icon icon="spinner" class="fa-spin"></font-awesome-icon>
  </div>
</template>

<script>
export default {
  name: "PurpleSpinner",
  props: {},
};
</script>
