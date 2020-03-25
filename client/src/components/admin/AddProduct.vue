<template>
  <div>
    <div class="formBoxAddProduct">
      <h3>ADD PRODUCT</h3>
      {{this.$store.state.dataAddProduct}}
      <br />
      <form @submit.prevent="actionSubmitAddProduct">
        <div class="form-group">
          <label>Product Name</label>
          <input type="text" class="form-control" v-model="dataAddProduct.name" required />
        </div>
        <div class="form-group">
          <label>Product Image</label>
          <input type="text" class="form-control" v-model="dataAddProduct.image_url" required />
        </div>
        <div class="form-group">
          <label>Price</label>
          <input type="number" class="form-control" v-model="dataAddProduct.price" required min="0" />
        </div>
        <div class="form-group">
          <label>Stock</label>
          <input type="number" class="form-control" v-model="dataAddProduct.stock" required min="0" />
        </div>
        <div class="form-group">
          <label>Category</label>
          <select class="form-control" v-model="dataAddProduct.CategoryId" required>
            <option value="1">baju</option>
            <option value="2">jaket</option>
            <option value="3">celana</option>
            <option value="4">sepatu</option>
          </select>
        </div>
        <button type="submit" class="btn btn2nd">Submit</button>
        <button type="button" class="btn btn2nd" @click="backtoAllProduct">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataAddProduct: {
        name: null,
        image_url: null,
        price: null,
        stock: null,
        CategoryId: null
      }
    };
  },
  methods: {
    actionSubmitAddProduct() {
      let dataAdd = {
        name: this.dataAddProduct.name,
        image_url: this.dataAddProduct.image_url,
        price: this.dataAddProduct.price,
        stock: this.dataAddProduct.stock,
        CategoryId: this.dataAddProduct.CategoryId
      };
      this.$store.dispatch("addProduct", dataAdd);
      this.$store.commit("setIsAddProductFalse");
      this.dataAddProduct.name = null;
      this.dataAddProduct.image_url = null;
      this.dataAddProduct.price = null;
      this.dataAddProduct.stock = null;
      this.dataAddProduct.CategoryId = null;
    },
    backtoAllProduct() {
      this.$store.commit("setIsAddProductFalse");
    }
  }
};
</script>

<style scoped>
.formBoxAddProduct {
  text-align: center;
  width: 500px;
  padding: 2em;
  border-radius: 2em;
  background-color: #e84393;
  color: #fff;
}
.btn2nd {
  margin: 1em;
  color: #e84393;
  border: none;
  background-color: #fff;
}
input {
  color: #e84393;
}
</style>