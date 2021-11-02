<template>
  <div id="app" class="bg-black min-h-screen">
    <Header />
    <div class="container mx-auto px-3 pb-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./components/general/Header";

const App = {
  name: "App",
  components: {
    Header,
  },
};

export default App;
</script>
