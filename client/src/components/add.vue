<template>
  <b-modal id="add" hide-footer title="Add Product" @hidden="resetModalData">
    <form @submit.prevent="add" ref="form">
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
            v-model="input.image_url"
            prepend-icon="mdi-camera"
            placeholder="Image"
            :rounded="true"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="8">
          <v-text-field v-model="input.name" label="Name" required></v-text-field>
        </v-col>
      </v-row>

      <v-text-field v-model="input.category" label="Category" required></v-text-field>
      <v-text-field v-model="input.price" label="Price" type="number" required></v-text-field>
      <v-text-field v-model="input.stock" type="number" label="Stock" required></v-text-field>
      <v-btn class="mr-4" type="submit" style="background-color:#39387a;color:white;">submit</v-btn>
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
      input: {
        name: "",
        image_url: "",
        category: "",
        price: "",
        stock: ""
      },
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Image size should be less than 2 MB!"
      ]
    };
  },
  methods: {
    async add() {
      try {
        let input = {
          name: this.input.name,
          image_url: this.input.image_url,
          category: this.input.category,
          price: Number(this.input.price),
          stock: Number(this.input.stock)
        };
        let { data } = await axios.post("/products", input, {
          headers: {
            access_token: localStorage.access_token
          }
        });
        if (data) {
          this.$bvModal.hide("add");
          this.resetModalData();
          this.$store.dispatch("get");
          Toast.fire({
            icon: "success",
            title: "Task created successfully."
          });
        }
      } catch (error) {
        errorHandler(error);
      }
    },
    resetModalData() {
      let stringDefault = "";
      let numberDefault = 0;
      let booleanDefault = false;
      Object.keys(this.input).forEach(key => {
        if (typeof this.input[key] === "number") {
          this.input[key] = numberDefault;
        } else if (typeof this.input[key] === "boolean") {
          this.input[key] = booleanDefault;
        } else {
          this.input[key] = stringDefault;
        }
      });
    }
  }
};
</script>