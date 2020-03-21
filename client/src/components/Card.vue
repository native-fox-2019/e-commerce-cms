<template>
  <div class="card mb-3" style="max-width: 540px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img v-bind:src="image_url" class="card-img">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ name }}</h5>
          <p class="card-text">Category: {{ category }}</p>
          <p class="card-text">Price: {{ price }}</p>
          <p class="card-text">Stock: {{ stock }}</p>
          <p class="card-text"><small class="text-muted">Last updated {{ updatedAt }}</small></p>
          <button class="btn btn-primary mr-2">Edit</button>
          <button class="btn btn-danger" @click="deleteProduct(id)" type="button">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      base_url: 'http://localhost:3000',
    };
  },
  name: 'Card',
  methods: {
    deleteProduct(id) {
      axios.delete(this.base_url.concat(`/product/${id}`))
        .then(() => {
          console.log('Berhasil menghapus data');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    update() {},
  },
  props: ['id', 'image_url', 'name', 'category', 'price', 'stock', 'updatedAt'],
};
</script>
