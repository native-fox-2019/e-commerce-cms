<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
    <router-link :to="{ name: 'main' }" class="navbar-brand">E-Commerce</router-link>

    <div>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-if="$store.state.navbar === `register`">
          <router-link to="/admins/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="$store.state.navbar === `login`">
          <router-link to="/admins/register" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item" v-if="$store.state.navbar === `main`">
          <router-link :to="{ name: 'logout' }" class="nav-link">Logout</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
};
</script>
