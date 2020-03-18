<template>
  <div class="home">
    <h1>Products</h1>
    <div class="products">
      <Card v-for="product in products" :key="product.id" :product="product" :isLogin="isLogin"/>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import Card from '../components/Card.vue';

export default {
  name: 'Home',
  props: ['isLogin', 'products'],
  components: {
    Card,
  },
  data() {
    return {
      // products: [],
    };
  },
  methods: {
  },
};
</script>
