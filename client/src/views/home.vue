<template>
<div>
  <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Image</th>
      <th scope="col">Price</th>
      <th scope="col">Stock</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="data in productData" :key="data.id">
      <td>{{ data.name }}</td>
      <td><img :src="data.image_url" :alt="data.name" style="width: 25%; height: 25%;"></td>
      <td>Rp. {{ data.price.toLocaleString() }}</td>
      <td>{{ data.stock }}</td>
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
