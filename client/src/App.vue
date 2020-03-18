<template>
  <div>
    <!-- <Login /> -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="btn btn-primary" to="/login">Go to Login</router-link>
      <router-link class="btn btn-primary" to="/">Homepage</router-link>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
};
</script>
