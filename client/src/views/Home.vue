<template>
  <div class="home">
    <h1>Products</h1>
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
