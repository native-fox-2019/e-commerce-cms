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
import Swal from 'sweetalert2';
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
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
          );
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
              let msg = null;
              if (err.response) {
                if (Array.isArray(err.response.data.msg)) {
                  msg = err.response.data.msg.join('<br>');
                } else {
                  msg = err.response.data.msg;
                }
              } else if (err.request) {
                msg = err.request;
              } else {
                msg = err.message;
              }
              Swal.fire({
                icon: 'error',
                title: 'Error',
                html: `${msg}`,
              });
            });
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
