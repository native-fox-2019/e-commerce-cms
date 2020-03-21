<template>
  <div id="app" :class="{ waiting: isProcessed }" @load="isProcessed = false">
    <router-view />
    <!-- <Home /> -->
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      isProcessed: false,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app.waiting {
  cursor: wait;
}
</style>
