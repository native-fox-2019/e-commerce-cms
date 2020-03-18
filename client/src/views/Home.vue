<template>
  <div>
    <sidebar-menu :menu="menu" />
    <router-view />
  </div>
</template>
<script>
import { SidebarMenu } from "vue-sidebar-menu";
export default {
  components: {
    SidebarMenu
  },
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Kolokal",
          hiddenOnCollapse: true
        },
        {
          href: "/",
          title: "Dashboard",
          icon: "fa fa-user"
        },
        {
          href: "/charts",
          title: "Charts",
          icon: "fa fa-chart-area",
        }
      ]
    };
  }
};
</script>