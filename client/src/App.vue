<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("toIsLoginTrue");
    } else {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
body {
  padding: 3em;
  /* background-color: rgba(229, 231, 232, 0.598); */
  background-color: #2c3338;
  font-family: "Roboto", sans-serif;
}
</style>
