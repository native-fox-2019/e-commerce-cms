<template>
    <div>
        <Navbar />
        <sidebar-menu :menu="menu" />
        <Products />
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
          tittle: 'Main navigation',
          hiddenOnCollapse: true,
        },
        {
          href: '/',
          title: 'Dashboard',
          icon: 'fa fa-user',
        },
        {
          href: '/charts',
          title: 'Charts',
          icon: 'fa fa-chart-area',
          child: [
            {
              href: '/charts/sublink',
              title: 'Sub Link',
            },
          ],
        },
      ],
    };
  },
};
</script>

<style>
  .v-sidebar-menu {
      background-color: #2a2a2e;
  }

  .v-sidebar-menu {
    position: fixed;
    left: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    z-index: 999;
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    transition: 0.3s max-width ease;
  }

  .v-sidebar-menu .vsm--scroll-wrapper {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .v-sidebar-menu .vsm--item {
    position: relative;
    display: block;
    width: 100%;
    white-space: nowrap;
  }

  .v-sidebar-menu .vsm--link>* {
    vertical-align: middle;
  }

  .v-sidebar-menu .vsm--link {
    color: #fff;
  }

  .v-sidebar-menu .vsm--link {
    cursor: pointer;
    position: relative;
    display: block;
    font-size: 16px;
    font-weight: 400;
    padding: 10px;
    line-height: 30px;
    text-decoration: none;
    user-select: none;
    z-index: 20;
    transition: 0.3s all ease;
  }

  .v-sidebar-menu .vsm--link_level-1 .vsm--icon {
    background-color: #1e1e21;
  }

  .v-sidebar-menu .vsm--link_level-1 .vsm--icon {
    height: 30px;
    line-height: 30px;
    width: 30px;
    text-align: center;
    border-radius: 3px;
  }

  .v-sidebar-menu .vsm--icon {
    color: #fff;
  }

  .v-sidebar-menu .vsm--icon {
    display: inline-block;
    margin-right: 10px;
  }
</style>
