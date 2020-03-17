<template>
  <div id="app">
    <Landing />
    <!-- <Home /> -->
  </div>
</template>

<script>
// import Home from './views/Home.vue';
import Landing from './views/Landing.vue';

export default {
  name: 'App',
  components: {
    Landing,
    // Home,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
