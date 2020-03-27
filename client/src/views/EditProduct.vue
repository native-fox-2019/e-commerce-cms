<template>
  <div class="edit-product">
    <ol class="breadcrumb bc-3">
      <li>
        <router-link to="/">
          <i class="fa-home"></i>Home
        </router-link>
      </li>
      <li>
        <router-link to="/products">Products</router-link>
      </li>
      <li class="active">
        <strong>Edit Product</strong>
      </li>
    </ol>
    <h2>Edit Product #{{ $route.params.id }}</h2>
    <hr />
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <div class="panel-title">Product Information</div>
          </div>
          <div class="panel-body">
            <form role="form" class="form-horizontal form-groups-bordered">
              <div class="form-group">
                <label for="name" class="col-sm-3 control-label">Name</label>
                <div class="col-sm-5">
                  <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Name of the product"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="category" class="col-sm-3 control-label">Category</label>
                <div class="col-sm-5">
                  <input
                    v-model="category"
                    type="text"
                    class="form-control"
                    id="category"
                    placeholder="Product category"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="image_url" class="col-sm-3 control-label">Image Url</label>
                <div class="col-sm-5">
                  <input
                    v-model="image_url"
                    type="text"
                    class="form-control"
                    id="image_url"
                    placeholder="https://blablabla/"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">Price</label>
                <div class="col-sm-5">
                  <div class="input-group">
                    <span class="input-group-addon">Rp</span>
                    <input
                      v-model="price"
                      type="text"
                      id="price"
                      class="form-control"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="stock" class="col-sm-3 control-label">Stock</label>
                <div class="col-sm-5">
                  <input
                    v-model="stock"
                    type="text"
                    class="form-control"
                    id="stock"
                    placeholder="0"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-3 col-sm-5">
                  <button v-on:click="save" type="button" class="btn btn-primary">Save</button>
                  <router-link to="/products" class="btn btn-light">Cancel</router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import baseUrl from '../baseUrl';

export default {
  name: 'EditProduct',
  data() {
    return {
      name: '',
      category: '',
      image_url: '',
      price: '',
      stock: '',
    };
  },
  methods: {
    save() {
      const id = parseInt(this.$route.params.id);
      axios
        .put(`${baseUrl}cms/products/${id}`, {
          name: this.name,
          category: this.category,
          image_url: this.image_url,
          price: parseInt(this.price, 10),
          stock: parseInt(this.stock, 10),
        }, {
          headers: {
            Authorization: this.$store.state.jwt,
          },
        })
          .then((product) => {
            this.$store.commit('updateProduct', product);
            this.$router.push('/products');
          })
          .catch(() => {});
    },
  },
  mounted() {
    const id = parseInt(this.$route.params.id);
    const product = this.$store.state.products.find(p => p.id === id);
    if (product) {
      this.name = product.name;
      this.category = product.category;
      this.image_url = product.image_url;
      this.price = product.price.toString();
      this.stock = product.stock.toString();
    } else {
      this.$router.push('/products');
    }
  }
};
</script>
