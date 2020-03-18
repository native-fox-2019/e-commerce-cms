<template>
<div>
  <Navbar />
  <div class="text-center m-2">
    <h1>Add a new Product</h1>
  </div>
  <div class="container">
    <AddProductCard
      @addProduct="addProduct"
    />
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/navbar.vue';
import AddProductCard from '../components/addProductCard.vue';

const baseUrl = 'http://localhost:3000';
export default {
  components: {
    Navbar,
    AddProductCard,
  },
  methods: {
    addProduct(payload) {
      axios({
        method: 'POST',
        url: `${baseUrl}/product`,
        headers: {
          token: localStorage.getItem('token'),
        },
        data: payload,
      })
        .then(() => {
          this.$router.push({
            path: '/',
          });
        }).catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log('Error', err.message);
          }
        });
    },
  },
};
</script>
