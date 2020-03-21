<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
// import Register from "./views/Register";
export default {
  // components: {
  //   Register
  // }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.swal2-popup {
  padding: 1% !important;
  margin: 1% !important;
  /* height: 200px; */
  width: 40vw !important;
}
.swal2-icon {
  width: 5vw;
}
.swal2-header {
  padding: 0% !important;
  margin: 0% !important;
}
.swal2-actions {
  padding: 0% !important;
  margin: 0% !important;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
*/
/* #nav a.router-link-exact-active {
  color: blue;
}  */
/* .router-link-active{
  background-color: rgb(161, 161, 168);
} */
</style>
