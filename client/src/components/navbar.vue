<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
    <a class="navbar-brand" href="#">E-Commerce</a>

    <div>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Register</a>
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
