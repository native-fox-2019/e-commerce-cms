<template>
  <form @submit.prevent="add">
    <div class="form-group">
      <label for="">Name</label>
      <input type="text" class="form-control" v-model="name">
    </div>
    <div class="form-group">
      <label for="">Image URL</label>
      <input type="text" class="form-control" v-model="image_url">
    </div>
    <div class="form-group">
      <label for="">Price</label>
      <input type="text" class="form-control" v-model="price">
    </div>
    <div class="form-group">
      <label for="">Stock</label>
      <input type="text" class="form-control" v-model="stock">
    </div>
    <div class="form-group">
      <label>Category</label>
      <select class="custom-select" v-model="category">
        <option selected disabled>Select category</option>
        <option>T-Shirt</option>
        <option>Hoodie</option>
        <option>Shoes</option>
        <option>Hat</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">Add</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddProduct',
  data() {
    return {
      name: '',
      image_url: '',
      price: null,
      stock: null,
      category: null,
      base_url: 'http://localhost:3000',
    };
  },
  methods: {
    add() {
      axios.post(this.base_url.concat('/product'), {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        category: this.category,
      })
        .then((data) => {
          console.log('Berhasil menambahkan product');
          this.$store.state.products.push(data.data);
          this.reset();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    reset() {
      this.name = '';
      this.image_url = '';
      this.price = null;
      this.stock = null;
      this.category = null;
    },
  },
};
</script>
