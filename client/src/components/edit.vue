<template>
  <b-modal id="edit" hide-footer title="Add Product">
    <form @submit.prevent="edit" ref="form">
      <v-row>
        <v-col cols="12" sm="1" md="4">
          <!-- <v-file-input
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            placeholder="Image"
            :rounded="true"
          ></v-file-input>-->
          <v-text-field
            accept="image/png, image/jpeg, image/bmp"
            v-model="image_url"
            prepend-icon="mdi-camera"
            placeholder="Image"
            :rounded="true"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="8">
          <v-text-field v-model="name" label="Name" required></v-text-field>
        </v-col>
      </v-row>

      <v-text-field v-model="category" label="Category" required></v-text-field>
      <v-text-field v-model="price" label="Price" type="number" required></v-text-field>
      <v-text-field v-model="stock" type="number" label="Stock" required></v-text-field>
      <v-btn class="mr-4" type="submit" style="background-color:#39387a;color:white;">Edit</v-btn>
    </form>
  </b-modal>
</template>
<script>
import { axios, errorHandler } from "../config/axios";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
export default {
  data() {
    return {
      name: "",
      image_url: "",
      category: "",
      price: "",
      stock: "",
      id: "",
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Image size should be less than 2 MB!"
      ]
    };
  },
  computed: {
    one() {
      return this.$store.state.oneProduct;
    }
  },
  watch: {
    one() {
      this.name = this.one.name;
      this.image_url = this.one.image_url;
      this.category = this.one.category;
      this.price = this.one.price;
      this.stock = this.one.stock;
      this.id = this.one.id;
    }
  },
  methods: {
    async edit() {
      try {
        let input = {
          name: this.name,
          image_url: this.image_url,
          category: this.category,
          price: Number(this.price),
          stock: Number(this.stock)
        };
        let { data } = await axios.put(`/products/${this.id}`, input, {
          headers: {
            access_token: localStorage.access_token
          }
        });
        if (data) {
          this.$bvModal.hide("edit");
          this.$store.dispatch("get");
          Toast.fire({
            icon: "success",
            title: "Product has been edited."
          });
        }
      } catch (error) {
        errorHandler(error);
      }
    }
  }
};
</script>