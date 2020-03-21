<template>
  <div class="add-product">
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
        <strong>Add Product</strong>
      </li>
    </ol>
    <h2>Add Product</h2>
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

export default {
  name: 'AddProduct',
  data() {
    return {
      name: '',
      category: '',
      price: '',
      stock: '',
    };
  },
  methods: {
    save() {
      axios
        .post('http://localhost:3000/products', {
          name: this.name,
          category: this.category,
          price: parseInt(this.price, 10),
          stock: parseInt(this.stock, 10),
        }, {

        })
        .then(() => {
          this.$router.push('/products');
        });
    },
  },
};
</script>
