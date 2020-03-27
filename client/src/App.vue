<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {

}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* border: solid 1px black; */
  min-height: 97vh;
  width: 97vw;
  width: 100vw;
}
body {
  top: 0;
  right: 0;
}
input {
  border-radius: 50px;
  height: 5vh;
  text-align: center;
}
</style>
