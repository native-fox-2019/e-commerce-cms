<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div>
      <button class="btn btn-warning m-1">Log Out</button>
      <button class="btn btn-success m-1">Add Product</button>
    </div>
  </nav>
  <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Image</th>
      <th scope="col">Price</th>
      <th scope="col">Stock</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="data in productData" :key="data.id">
      <td>{{ data.name }}</td>
      <td><img :src="data.image_url" :alt="data.name" style="width: 250px; height: 250px;"></td>
      <td>Rp. {{ data.price.toLocaleString() }}</td>
      <td>{{ data.stock }}</td>
      <td>
        <button class="btn btn-primary m-1">
          Edit
        </button>
        <button class="btn btn-danger m-1">
          Delete
        </button>
      </td>
    </tr>
  </tbody>
  </table>
</div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  computed: mapState(['productData']),
  created() {
    this.$store.dispatch('getData');
  },
};
</script>
