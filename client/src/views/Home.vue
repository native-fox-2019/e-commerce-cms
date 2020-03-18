<template>
    <div class="home" :class="{ collapsed: isCollapsed }">
        <Navbar />
        <Products >
          <sidebar-menu @toggle-collapse="onToggleColapse"  :menu="menu" />
        </Products>
    </div>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu';
import Products from '../components/Products.vue';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Home',
  components: {
    Products,
    Navbar,
    SidebarMenu,
  },
  data() {
    return {
      menu: [
        {
          header: true,
          title: 'Main',
          hiddenOnCollapse: false,
        },
        {
          href: '/products',
          title: 'Dashboard',
          icon: 'fa fa-user',
        },
        {
          href: '/products',
          title: 'Actions',
          icon: 'fa fa-chart-area',
          child: [
            {
              href: '/products/add',
              title: 'Add Products',
            },
          ],
        },
      ],
      isCollapsed: false,
    };
  },
  methods: {
    onToggleColapse(collapsed) {
      if (collapsed) {
        this.isCollapsed = true;
      } else {
        this.isCollapsed = false;
      }
    },
  },
};
</script>

<style scoped>
  .home {
    padding-left: 350px;
    transition: all .3s ease
  }

  .home.collapsed {
    padding-left: 50px;
  }
</style>
