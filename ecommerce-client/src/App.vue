<template>
  <div id="app">
    <div class="nav">
      <div class="navLeft">
        <span class="navTitle"> Page Title </span>
      </div>
      <div class="navRight">
      <router-link to="/">Home</router-link>
      <router-link to="/about" class="padding1p">About</router-link>
      <router-link to="/login" class="padding1p">Login</router-link>
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
