<template>
  <div class="home">
    <h1 v-if="$store.state.products.length !== 0">Products</h1>
    <p v-if="$store.state.products.length === 0"
      style="font-weight: 500; font-size: 25px">LOADING....</p>
    <div class="products">
      <Card v-for="product in $store.state.products" :key="product.id"
      :product="product"/>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue';

export default {
  name: 'Home',
  props: [],
  components: {
    Card,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>
