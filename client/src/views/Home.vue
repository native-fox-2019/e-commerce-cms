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

export default {
  name: 'Home',
  components: {
    Card,
    Navbar,
    AddProduct,
  },
  created() {
    this.$store.dispatch('getProducts');
  },
};
</script>
