<template>
    <div class="home" :class="{ collapsed: isCollapsed }">
        <Navbar />
          <Sidebar @collapsed="onToggleCollapse" />
        <Products >
        </Products>
    </div>
</template>

<script>
import Products from '../components/Products.vue';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';

export default {
  name: 'Home',
  components: {
    Products,
    Navbar,
    Sidebar,
  },
  created() {
    document.body.style.cursor = 'default';
  },
  data() {
    return {
      isCollapsed: false,
    };
  },
  methods: {
    onToggleCollapse(collapsed) {
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
