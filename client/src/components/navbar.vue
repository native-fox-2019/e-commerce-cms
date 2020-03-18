<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div>
      <button class="btn btn-warning m-1" @click="logout">Log Out</button>
      <button class="btn btn-success m-1" @click="addProduct">Add Product</button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ path: '/login' });
      this.$store.dispatch('logout');
    },
    addProduct() {
      this.$router.push({ path: '/addproduct' });
    },
  },
};
</script>
