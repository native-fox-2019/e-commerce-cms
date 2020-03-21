<template>
  <div class="product-list">
    <ol class="breadcrumb bc-3">
      <li>
        <router-link to="">
          <i class="fa-home"></i>Home
        </router-link>
      </li>
      <li>
        <router-link to="products">Products</router-link>
      </li>
      <li class="active">
        <strong>Product List</strong>
      </li>
    </ol>
    <h2>Product List</h2>
    <hr />
    <div class="panel panel-primary">
      <div class="panel-heading">
        <div class="panel-title">eCommerce Products</div>
      </div>
      <div class="panel-body with-table">
        <table class="table table-bordered table-responsive">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" v-bind:key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.stock }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getAllProduct() {
      axios.get('http://localhost:3000/products', {
        headers: {
          Authorization: localStorage.jwt,
        },
      }).then((response) => {
        this.products = response.data;
      });
    },
  },
  mounted: () => {
    this.getAllProduct();
  },
};
</script>
