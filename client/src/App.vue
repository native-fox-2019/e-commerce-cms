<template>
  <div id="app">
    <div id="nav" class="navbar bg-dark justify-content-start">
      <div class="Home mr-3" v-if="!this.$store.state.token">
        <router-link to="/">Home</router-link>
      </div>
      <div class="Register mr-3" v-if="!this.$store.state.token">
        <router-link to="/register">Register</router-link>
      </div>
      <router-link to="/panel">Admin Panel</router-link>
      <div class="Add ml-3" v-if="this.$store.state.token">
        <router-link to="/add">Add Product</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<style>
@import url(https://fonts.googleapis.com/css?family=Baloo+2&display=swap);
@import url(https://fonts.googleapis.com/css?family=Lato:300,400&display=swap);
#app {
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  font-family: 'Baloo 2'
}

#nav a {
  font-weight: bold;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #fbb000;
}
</style>
