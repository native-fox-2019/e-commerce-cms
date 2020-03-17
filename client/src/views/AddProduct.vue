<template>
    <div class="add-product">
      <div>
      <h3>Add Product</h3>
      <form @submit.prevent="addProduct">
        <input type="text" placeholder="Name" v-model="name"><br>
        <input type="text" placeholder="Image url" v-model="image_url"><br>
        <input type="text" placeholder="Price" v-model="price"><br>
        <input type="text" placeholder="Stock" v-model="stock"><br>
        <button type="submit">Add Product</button>
        <p style="color: red" v-for="error in addProductError" :key="error"> {{ error }}</p>
      </form>
    </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'AddProduct',
  props: ['baseUrl'],
  data() {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: '',
      addProductError: [],
      product: {},
    };
  },
  methods: {
    addProduct() {
      const options = {
        url: `${this.baseUrl}/products`,
        method: 'post',
        headers: {
          token: localStorage.token,
        },
        data: {
          name: this.name,
          image_url: this.image_url,
          price: Number(this.price),
          stock: Number(this.stock),
        },
      };
      axios(options)
        .then((response) => {
          this.product = response.data.product;
          this.$emit('addProduct', this.product);
          this.addProductError = [];
          this.name = '';
          this.image_url = '';
          this.price = '';
          this.stock = '';
          this.$router.push('/');
        })
        .catch((err) => {
          this.addProductError = [];
          if (err.response.data.error) {
            err.response.data.error.forEach((item) => {
              this.addProductError.push(item.msg);
            });
          } else {
            this.addProductError.push(err.response.data.msg);
          }
        });
    },
  },
};
</script>
