import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

let routes = [
  {
    path: "*",
    redirect: "/",
  },
];

const modules = require.context("./", true, /router\.js$/);
modules
  .keys()
  .filter((module) => module !== "./router.js")
  .map((module) => {
    routes = routes.concat(modules(module).default);
  });

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
