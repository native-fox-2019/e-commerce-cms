<template>
  <div class="mr-5 ml-5">
    <b-form @reset.prevent="onReset">
      <div>
        <h3>
          <u>Add Form</u>
        </h3>
      </div>
      <b-form-group label="Name:">
        <b-form-input v-model="name" type="text" required placeholder="Enter Product's name"></b-form-input>
      </b-form-group>

      <b-form-group label="Product Image:">
        <b-form-input
          v-model="image_url"
          type="url"
          required
          placeholder="Enter Product's Image Url"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Price:">
        <b-form-input v-model="price" type="number" required placeholder="0"></b-form-input>
      </b-form-group>

      <b-form-group label="Stock:">
        <b-form-input v-model="stock" type="number" required placeholder="0"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" @click.prevent="addProduct">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button variant="warning" @click.prevent="back">Back</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      image_url: "",
      price: 0,
      stock: 0
    };
  },
  methods: {
    back() {
      this.$router.push("product");
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.name = "";
      this.image_url = "";
      this.price = 0;
      this.stock = 0;
    },
    addProduct() {
      console.log("1.masuk product");
      console.log(
        "2.name",
        this.name,
        "3.image_url",
        this.image_url,
        "4.price",
        this.price,
        "5.stock",
        this.stock
      );
      axios({
        method: "POST",
        url: "http://localhost:3000/product/",
        data: {
          name: this.name,
          image_url: this.image_url,
          price: this.price,
          stock: this.stock
        },
        headers: { token: localStorage.getItem("token") }
      }).then(response => {
        console.log("ini response", response.data);
        this.$store.dispatch("pushData", response.data);
        this.$router.push("product");
      });
    }
  }
};
</script>