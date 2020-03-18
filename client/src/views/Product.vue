<template>
  <div class="product">
    <div class="product-content">
        <div class="product-image">
          <img :src="image_url" width="300px" height="auto">
          <div class="action" v-if="$store.state.isLogin">
              <div class="btn-edit" @click="changeIsBtnEdit">
                  <i class="fa fa-edit"></i>
              </div>
              <div class="btn-delete">
                  <i class="fa fa-trash" style="font-size: 35px" @click="deleteProduct(id)"></i>
              </div>
          </div>
        </div>
        <div class="product-details">
          <div class="product-name">
            <h2>{{name}}</h2>
          </div>
          <div class="product-price">
            <span>Rp{{price}}</span>
          </div>
          <div class="product-stock">
            <span>Stock: {{stock}}</span>
          </div>
        </div>
    </div>
    <div class="edit-product" v-if="isBtnEdit">
      <div>
        <h3>Edit Product</h3>
        <form @submit.prevent="editProduct">
          <input type="text" placeholder="Name" v-model="name"><br>
          <input type="text" placeholder="Image url" v-model="image_url"><br>
          <input type="text" placeholder="Price" v-model="price"><br>
          <input type="text" placeholder="Stock" v-model="stock"><br>
          <button type="submit">Edit Product</button>
          <p style="color: red" v-for="error in addProductError" :key="error"> {{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import swal from 'sweetalert';

export default {
  name: 'Product',
  props: ['data'],
  created() {
    this.getProduct();
  },
  data() {
    return {
      id: 0,
      message: '',
      name: '',
      price: 0,
      stock: 0,
      image_url: '',
      isBtnEdit: false,
    };
  },
  methods: {
    getProduct() {
      const options = {
        url: `${this.$store.state.baseUrl}/products/${this.$route.params.id}`,
        method: 'get',
      };
      axios(options)
        .then((response) => {
          this.id = response.data.product.id;
          this.name = response.data.product.name;
          this.price = response.data.product.price;
          this.stock = response.data.product.stock;
          this.image_url = response.data.product.image_url;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    changeIsBtnEdit() {
      this.isBtnEdit = !this.isBtnEdit;
    },
    deleteProduct(id) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this Product!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            const options = {
              url: `${this.$store.state.baseUrl}/products/${this.id}`,
              method: 'delete',
              headers: {
                token: localStorage.token,
              },
            };
            axios(options)
              .then((response) => {
                this.message = response.message;
                this.$store.commit('deleteProduct', id);
                swal('Poof! Your product has been deleted!', {
                  icon: 'success',
                });
                this.$router.push('/');
              })
              .catch((err) => {
                console.log(err.response);
              });
          } else {
            swal('Your product is safe!');
          }
        });
    },
  },
};
</script>
