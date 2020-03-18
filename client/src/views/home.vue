<template>
<div>
  <Navbar />
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
        <button class="btn btn-primary m-1" @click.prevent="editData(data.id)">
          Edit
        </button>
        <button class="btn btn-danger m-1" @click.prevent="deleteData(data.id)">
          Delete
        </button>
      </td>
    </tr>
  </tbody>
  </table>
</div>
</template>

<script>

import axios from 'axios';
import { mapState } from 'vuex';
import Navbar from '../components/navbar.vue';

const baseUrl = 'http://localhost:3000';
export default {
  components: {
    Navbar,
  },
  computed: mapState(['productData']),
  created() {
    this.$store.dispatch('getData');
  },
  methods: {
    deleteData(id) {
      axios({
        method: 'DELETE',
        url: `${baseUrl}/product/${id}`,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(() => {
          this.$store.dispatch('getData');
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
    editData(id) {
      const filtered = this.productData.filter((productData) => productData.id === id)[0];
      this.$store.dispatch('editData', filtered);
      this.$router.push({
        path: '/editproduct',
      });
    },
  },
};
</script>
