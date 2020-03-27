<template>
  <div class="page-container">
    <SidebarMenu />
    <div class="main-content">
      <AccountBar />
      <hr />
      <router-view />
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
