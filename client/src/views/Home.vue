<template>
    <div>
        <Navbar />
        <Products />
    </div>
</template>

<script>
import Products from '../components/Products.vue';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Home',
  components: {
    Products,
    Navbar,
  },
};
</script>

<style>
</style>
