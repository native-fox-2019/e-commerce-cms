<template>
  <div class="home">
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  created() {
    this.getProducts();
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      const options = {
        url: 'http://localhost:3003/products',
        method: 'get',
      };
      axios(options)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
};
</script>
