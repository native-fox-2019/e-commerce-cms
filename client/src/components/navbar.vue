<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
    <router-link :to="{ name: 'main' }" class="navbar-brand">E-Commerce</router-link>
    <ul class="navbar-nav mr-auto" v-if="$store.state.role === 'admin'">
        <li class="nav-item"  @click="$bvModal.show('addForm')">
          <a href="#" class="nav-link">Add Product</a>
        </li>
      </ul>

    <div>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-if="$store.state.navbar === `register`">
          <router-link to="/admins/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="$store.state.navbar === `login`">
          <router-link to="/admins/register" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item" v-if="$store.state.navbar === `main`">
          <router-link :to="{ name: 'logout' }" class="nav-link">Logout</router-link>
        </li>
      </ul>
    </div>
    <b-modal id="addForm" hide-footer title="Add Product">
      <b-form @submit="onSubmit">
      <b-form-group label="Product Title:">
        <b-form-input
          v-model="form.name"
          type="text"
          required
          placeholder="Input Title here"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Image URL:">
        <b-form-input
          v-model="form.image_url"
          type="url"
          required
          placeholder="Image URL here"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Price:">
        <b-form-input
          v-model="form.price"
          type="number"
          required
          placeholder="Enter Price"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Stock:">
        <b-form-input
          v-model="form.stock"
          type="number"
          required
          placeholder="Enter Stock"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Add</b-button>
    </b-form>
    </b-modal>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: 'navbar',
  data() {
    return {
      form: {
        name: '',
        image_url: '',
        price: 1,
        stock: 1,
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios({
        url: '/products',
        baseURL: this.$store.state.url,
        method: 'post',
        headers: {
          token: localStorage.token,
        },
        data: this.form,
      })
        .then(({ data }) => {
          this.form.name = '';
          this.form.image_url = '';
          this.form.price = 1;
          this.form.stock = 1;
          this.$bvModal.hide('addForm');
          this.$store.state.list.push(data);
        })
        .catch((err) => {
          this.$store.dispatch('toast', { vm: this, message: err.response.data.status_message.join(', ') });
        });
    },
  },
};
</script>
