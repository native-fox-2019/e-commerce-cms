<template>
  <div class="home">
    <h1>Products</h1>
    <div class="products">
      <Card v-for="product in products" :key="product.id" :product="product" :isLogin="isLogin"
      :baseUrl="baseUrl" @deleteProduct="deleteProduct"/>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import Card from '../components/Card.vue';

export default {
  name: 'Home',
  props: ['isLogin', 'products', 'baseUrl'],
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
    deleteProduct(id) {
      this.$emit('deleteProduct', id);
    },
  },
};
</script>
