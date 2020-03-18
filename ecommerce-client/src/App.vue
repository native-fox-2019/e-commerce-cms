<template>
  <div id="app">
    <div class="nav">
      <div class="navLeft">
        <span class="navTitle"> Page Title </span>
      </div>
      <div class="navRight">
      <router-link to="/" class="navPadding">Home</router-link>
      <router-link to="/about" class="navPadding">About</router-link>
      <router-link to="/login" class="navPadding" v-if="!$store.state.isLogin" >Login</router-link>
      <router-link to="/login" class="navPadding" v-if="$store.state.isLogin" >Logout</router-link>
      </div>
    </div>
    <div class="divCenter">
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
};
</script>
