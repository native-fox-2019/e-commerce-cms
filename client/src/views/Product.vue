<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button type="button" class="btn btn-success" @click.prevent="changeAddTrue">
              Add new product
            </button>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <button class="btn btn-danger" @click="doLogOut">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
    <div class="text-center mt-5" v-if="!addNew">
      <h1>Product List</h1>
    </div>
    <div class="row mt-5" v-if="!addNew">
      <div class="col-2 mt-3 ml-5" v-for="item in itemList" :key="item.id">
        <div class="card" style="width: 18rem;">
          <img
            class="card-img-top"
            :src="item.image_url"
            alt="Card image cap"
            style="width:100%; height:350px;"
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">
              IDR {{ item.price }}
            </p>
            <span class="btn btn-primary">Edit</span> |
            <span class="btn btn-danger" @click.prevent="deleteProduct(item.id)">Delete</span>
          </div>
        </div>
      </div>
    </div>
    <!-- ADD NEW FORM -->
    <div class="container p-5 mt-5">
      <div id="addNewForm" v-if="addNew">
        <form @submit.prevent="addNewProduct">
          <h2 class="text-center">Add New Product</h2>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Product name"
              required="required"
              v-model="name"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Image Url"
              required="required"
              v-model="image_url"
            />
          </div>
          <div class="form-group">
            <input
              type="number"
              class="form-control"
              placeholder="Price"
              required="required"
              v-model="price"
            />
          </div>
          <div class="form-group">
            <input
              type="number"
              class="form-control"
              placeholder="Stock"
              required="required"
              v-model="stock"
            />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">
              Add new product
            </button><br>
            <button type="button" class="btn btn-danger mt-1" @click.prevent="changeAddFalse">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from 'sweetalert2'

export default {
  created() {
    this.getItems();
  },
  data() {
    return {
      itemList: null,
      addNew: false,
      name: ``,
      image_url: ``,
      price: ``,
      stock: ``
    };
  },
  methods: {
    doLogOut() {
      localStorage.removeItem("access_token");
      this.$router.push({ name: "Login" });
    },
    getItems() {
      axios
        .get("http://localhost:3000/products", {
          headers: { access_token: localStorage.access_token }
        })
        .then(data => {
          this.itemList = data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addNewProduct() {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/products/add',
            headers: { access_token : localStorage.access_token },
            data: {
                name: this.name,
                image_url: this.image_url,
                price: this.price,
                stock: this.stock
            }
        })
        .then(data => {
            console.log(data)
            Swal.fire('Success adding new product')
            this.addNew = false
            this.getItems()
        })
        .catch(response => {
            Swal.fire({
                icon: 'error',
                title: response.response.data.msg
            })
        })

    },
    changeAddFalse() {
        this.addNew = false
        this.name = ``,
        this.image_url = ``,
        this.price = ``,
        this.stock = ``
    },
    changeAddTrue() {
        this.name = ``,
        this.image_url = ``,
        this.price = ``,
        this.stock = ``
        this.addNew = true
    },
    deleteProduct(id) {
        axios({
            method: 'DELETE',
            url: `http://localhost:3000/products/delete/${id}`,
            headers: { access_token:localStorage.access_token }
        })
        .then(data => {
            console.log(data)
            Swal.fire('Product successfully deleted')
            this.getItems()
        })
        .catch(response => {
            console.log(response)
        })
    }
  }
};
</script>
