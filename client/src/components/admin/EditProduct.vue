<template>
  <div>
    <div class="formBoxAddProduct">
      <h3>EDIT PRODUCT</h3>
      <!-- {{this.$store.state.dataEditProducts}}
      {{dataFormProduct.name}}-->
      <br />
      <form @submit.prevent="actionSubmitEditProduct">
        <div class="form-group">
          <label>Product Name</label>
          <input type="text" class="form-control" v-model="dataFormProduct.name" required />
        </div>
        <div class="form-group">
          <label>Product Image</label>
          <input type="text" class="form-control" v-model="dataFormProduct.image_url" required />
        </div>
        <div class="form-group">
          <label>Price</label>
          <input type="number" class="form-control" v-model="dataFormProduct.price" required />
        </div>
        <div class="form-group">
          <label>Stock</label>
          <input type="number" class="form-control" v-model="dataFormProduct.stock" required />
        </div>
        <div class="form-group">
          <label>Category</label>
          <select class="form-control" v-model="dataFormProduct.CategoryId" required>
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
      dataFormProduct: {
        id: null,
        name: null,
        image_url: null,
        price: null,
        stock: null,
        CategoryId: null
      }
    };
  },
  created() {
    this.dataFormProduct.id = this.$store.state.dataEditProducts.id;
    this.dataFormProduct.name = this.$store.state.dataEditProducts.name;
    this.dataFormProduct.image_url = this.$store.state.dataEditProducts.image_url;
    this.dataFormProduct.price = this.$store.state.dataEditProducts.price;
    this.dataFormProduct.stock = this.$store.state.dataEditProducts.stock;
    this.dataFormProduct.CategoryId = this.$store.state.dataEditProducts.CategoryId;
  },
  methods: {
    actionSubmitEditProduct() {
      let dataUpdate = {
        id: this.dataFormProduct.id,
        name: this.dataFormProduct.name,
        image_url: this.dataFormProduct.image_url,
        price: this.dataFormProduct.price,
        stock: this.dataFormProduct.stock,
        CategoryId: this.dataFormProduct.CategoryId
      };
      // console.log(dataUpdate, " <<<<< methods masuk");

      this.$store.dispatch("updateProduct", dataUpdate);
      this.dataFormProduct.name = null;
      this.dataFormProduct.image_url = null;
      this.dataFormProduct.price = null;
      this.dataFormProduct.stock = null;
      this.dataFormProduct.CategoryId = null;
    },
    backtoAllProduct() {
      this.$store.commit("setIsAddProductFalse");
      this.$store.commit("setIsEditProductFalse");
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