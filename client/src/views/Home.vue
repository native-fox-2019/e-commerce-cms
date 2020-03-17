<template>
  <div class="home">
    <h1>Ini Home</h1>
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
  // created() {
  //   this.getProducts();
  // },
  components: {
    Card,
  },
  data() {
    return {
      // products: [],
    };
  },
  methods: {
    // getProducts() {
    //   const options = {
    //     url: 'http://localhost:3003/products',
    //     method: 'get',
    //   };
    //   axios(options)
    //     .then((response) => {
    //       this.products = response.data.products;
    //     })
    //     .catch((err) => {
    //       console.log(err.response.data);
    //     });
    // },
  },
};
</script>
