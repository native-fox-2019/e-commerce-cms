<template>
<div>
    <div class="alert alert-danger" role="alert" v-if="alert">
      {{ this.msg }}
  </div>
  <div class="add">
    <h3> Add Product </h3>
            <form id="form-add" action="" method="POST">
                <label for="fname">Name:</label><br>
                <input type="text" id="Name" name="Name" value="" v-model="name" required><br>
                <label for="fname">Image Url:</label><br>
                <input
                type="text" id="email" name="email" value="" v-model="image_url" required
                ><br>
                <label for="lname">Price:</label><br>
                <input type="text" name="price" value="" v-model="price" required><br><br>
                <label for="lname">Stock:</label><br>
                <input type="text" name="stock" value="" v-model="stock" required><br><br>
                <input
                type="submit" class="btn btn-dark mr-2" value="Add Product" v-on:click.prevent="add"
                >
                <router-link to="/panel">
                <input type="button" class="btn btn-warning" value="Back">
                </router-link>
            </form>
  </div>
</div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Add',
  data() {
    return {
      alert: false,
      msg: '',
      baseUrl: 'https://rocky-bayou-33894.herokuapp.com',
      token: null,
      name: '',
      image_url: '',
      price: '',
      stock: '',
    };
  },
  Components: {

  },
  created() {

  },
  methods: {
    add() {
      axios({
        method: 'POST',
        url: `${this.baseUrl}/product`,
        headers: { token: localStorage.getItem('token') },
        data: {
          name: this.name,
          image_url: this.image_url,
          price: this.price,
          stock: this.stock,
        },
      })
        .then((data) => {
          this.$router.push({ name: 'Panel' });
        })
        .catch((error) => {
          this.alert = true;
          this.msg = 'Field Cannot be empty!';
        });
    },
  },
};
</script>
<style scoped>
.add {
  border-color: black;
  border-style : double;
  width: 20%;
  text-align: center;
  font-family: "Lato";
  margin : 60px auto;
  background: white;
  padding: 15px;
}
</style>
