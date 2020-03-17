<template>
  <div>
    <!-- <Login /> -->
    <router-link to="/login">Go to Login</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
// import Login from './views/login.vue';
import router from './routers/index';
export default {
  router,
  components: {
    // Login
  }
}
</script>