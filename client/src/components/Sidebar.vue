<template>
  <b-card>
    <b-nav pills vertical class="w-100">
      <!-- <router-link to="/dashboard" class="nav-link">
        <i class="icon ion-md-notifications-outline mr-2"></i>
        <span>Dashboard</span>
      </router-link> -->
      <router-link to="/users" class="nav-link">
        <i class="icon ion-md-notifications-outline mr-2"></i>
        <span>Users</span>
      </router-link>
      <router-link to="/categories" class="nav-link">
        <i class="icon ion-md-notifications-outline mr-2"></i>
        <span>Category</span>
      </router-link>
      <router-link to="/products" class="nav-link">
        <i class="icon ion-md-notifications-outline mr-2"></i>
        <span>Products</span>
      </router-link>
    </b-nav>
  </b-card>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      activeClass: "active"
    };
  },
  computed: {
    currentPage() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
.router-link-active {
  opacity: 1;
  visibility: visible;
  border: solid transparent;
  border-left-color: rgb(0, 81, 255);
  background-color: rgb(234, 240, 255);
  margin: 1px;
  transition: all 0.25s;
}
</style>
