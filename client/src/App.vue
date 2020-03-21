<template>
  <div class="page-container">
    <SidebarMenu isLoggedIn="!!localStorage.jwt" />
    <div class="main-content">
      <AccountBar />
      <hr />
      <router-view />
      <!-- Footer -->
      <footer class="main">
        &copy; 2015
        <strong>Neon</strong> Admin Theme by
        <a href="http://laborator.co" target="_blank">Laborator</a>
      </footer>
    </div>
  </div>
</template>

<script>
import SidebarMenu from './views/SidebarMenu.vue';
import AccountBar from './views/AccountBar.vue';

export default {
  name: 'App',
  components: {
    SidebarMenu,
    AccountBar,
  },
};
</script>
