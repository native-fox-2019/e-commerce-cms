<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login"></router-link>
      <router-link to="/"></router-link>
      <router-link to="/addproduct"></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* #nav {
  
} */

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: yellow;
}
</style>
