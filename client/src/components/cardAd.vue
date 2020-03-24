<template>
  <div class="page card d-flex flex-column justify-content-between"
  @click="$bvModal.show(formName)">
    <div class="d-flex flex-column">
      <h3>{{title}}</h3>
      <img :src="data.image_url" alt="error retrieving image" />
    </div>
    <div class="mt-3">
      <p class="float-left">Price: {{data.price}}</p>
      <p class="float-right">{{data.stock}} in stock</p>
    </div>
    <b-modal :id="formName" hide-footer title="Edit Product">
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

      <b-button type="submit" variant="primary">Edit</b-button>
      <b-button type="button" variant="secondary" class="float-right" @click="onDelete">
        Delete
      </b-button>
    </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['data'],
  data() {
    return {
      form: {
        name: this.data.name,
        image_url: this.data.image_url,
        price: this.data.price,
        stock: this.data.stock,
      },
      formName: `editForm${this.data.id}`,
    };
  },
  computed: {
    title() {
      if (this.data.name.length > 0) {
        return `${this.data.name.slice(0, 14)}...`;
      }
      return this.data.name;
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios({
        url: `/products/${this.data.id}`,
        baseURL: this.$store.state.url,
        method: 'put',
        headers: {
          token: localStorage.token,
        },
        data: this.form,
      })
        .then(() => {
          this.$emit('update');
          this.$bvModal.hide(`editForm${this.data.id}`);
        })
        .catch((err) => {
          this.$store.dispatch('toast', { vm: this, message: err.response.data.status_message.join(', ') });
        });
    },

    onDelete() {
      axios({
        url: `/products/${this.data.id}`,
        baseURL: this.$store.state.url,
        method: 'delete',
        headers: {
          token: localStorage.token,
        },
      })
        .then(() => {
          this.$emit('update');
          this.$bvModal.hide('editForm');
        })
        .catch((err) => {
          this.$store.dispatch('toast', { vm: this, message: err.response.data.status_message.join(', ') });
        });
    },
  },
};
</script>

<style scoped>
.page {
  padding: 1em;
  width: 100%;
  height: 100%;
}

.page:hover, .page:focus {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.11);
  box-shadow: 0 0 0.3em 0 black;
  outline: none;
}

img {
  height: 13vw;
  align-self: center;
}
</style>
