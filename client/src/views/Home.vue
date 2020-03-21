<template>
  <div class="home" style="max-height: 80vh">
    <Navbar />
    <div class="container-fluid mt-3">
      <div class="row">
        <div class="col-4">
          <AddProduct />
        </div>
        <div class="col-8" style="max-height: 100vh; overflow: auto;">
          <div class="row">
            <ul class="col-6 list-group" v-for="product in this.$store.state.products"
            :key="product.id">
              <li class="list-group-item">
                <Card :name="product.name" :category="product.category"
                :price="product.price" :stock="product.stock"
                :updatedAt="product.updatedAt" :id="product.id"
                :image_url="product.image_url" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Card from '@/components/Card.vue';
import AddProduct from '@/components/AddProduct.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Card,
    Navbar,
    AddProduct,
  },
  created() {
    axios.get('http://localhost:3000/product')
      .then((data) => {
        data.data.forEach((product) => {
          this.$store.state.products.push(product);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
