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
    <div class="panel panel-primary" v-if="products !== null">
      <div class="panel-heading">
        <div class="panel-title">eCommerce Products</div>
      </div>
      <div class="panel-body with-table">
        <table class="table table-bordered table-responsive">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" v-bind:key="product.id">
              <td>{{ product.id }}</td>
              <td><img v-bind:src="product.image_url" class="img-responsive" style="width: 40px;" /></td>
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.stock }}</td>
              <td>
                <router-link v-bind:to="'/edit-product/' + product.id" class="btn btn-light btn-sm">
                  Edit
                </router-link>
                  <router-link v-bind:to="'/delete-product/' + product.id" class="btn btn-danger btn-sm">
                  Delete
                </router-link>
              </td>
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
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  methods: {
    getAllProduct() {
      axios.get('http://localhost:3000/products', {
        headers: {
          Authorization: this.$store.state.jwt,
        },
      })
        .then((response) => {
          this.$store.commit('setProducts', response.data);
        })
        .catch((err) => console.log(err, err.response.message));
    },
  },
  mounted() {
    this.getAllProduct();
  },
};
</script>
