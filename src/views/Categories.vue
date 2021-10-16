<template>
  <div class="categories">
    <div class="flex flex-wrap -mx-2">
      <div
        v-for="(list, index) in lists"
        :key="index"
        class="w-1/3 sm:w-1/3 flex-col text-gray-700 text-center px-2 mb-8"
      >
        <router-link
          :to="/categories/ + list.link"
          class="
            block
            bg-gray-400
            text-center text-lg
            p-2
            transition
            duration-200
            ease-in-out
            hover:bg-gray-800 hover:text-gray-200
          "
        >
          {{ list.label }}</router-link
        >
        <router-link
          :to="/categories/ + list.link"
          class="flex flex-wrap w-full"
        >
          <clazy-load
            v-for="(sample, index) in list.samples.slice(0, 12)"
            :key="index"
            :src="imageChecker(sample.poster_path)"
            tag="span"
            loadedClass="flex w-1/4"
            loadingClass="flex w-1/4"
          >
            <router-link :to="{ name: 'Movie', params: { id: sample.id } }">
              <img
                :src="imageChecker(sample.poster_path)"
                :alt="sample.original_title"
                class="
                  opacity-50
                  hover:opacity-100
                  transition
                  duration-200
                  ease-in-out
                "
              />
            </router-link>

            <span slot="placeholder" class="flex justify-center w-full h-full">
              <font-awesome-icon
                icon="spinner"
                class="fa-spin text-purple-900 m-auto text-xl"
              ></font-awesome-icon>
            </span>
          </clazy-load>
        </router-link>
        <router-link
          :to="/categories/ + list.link"
          class="
            block
            bg-gray-400
            text-center
            p-2
            transition
            duration-200
            ease-in-out
            hover:bg-gray-800 hover:text-gray-200
          "
        >
          Show All</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { imageChecker } from "../mixins";

export default {
  name: "Categories",
  computed: {
    ...mapGetters(["languageCurrent", "lists"]),
  },
  methods: {
    ...mapActions({
      fetchListsData: "fetchListsData",
    }),
  },
  watch: {
    languageCurrent: function () {
      this.fetchListsData();
    },
  },
  created() {
    this.fetchListsData();
  },
  mixins: [imageChecker],
};
</script>

<style></style>
