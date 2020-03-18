<template>
<div>
  <div class="text-center">
    <h1>Edit Your Product</h1>
  </div>
  <div class="container">
    <form @submit.prevent="editProduct">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" v-model="name">
      </div>
      <div class="form-group">
        <label>Image Url</label>
        <input type="text" class="form-control" v-model="image_url">
      </div>
      <div class="form-group">
        <label>Price</label>
        <input type="number" min="1" class="form-control" v-model="price">
      </div>
      <div class="form-group">
        <label>Stock</label>
        <input type="number" min="1" class="form-control" v-model="stock">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['editData']),
  data() {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: '',
    };
  },
  created() {
    this.name = this.editData.name;
    this.image_url = this.editData.image_url;
    this.price = this.editData.price;
    this.stock = this.editData.stock;
  },
};
</script>
