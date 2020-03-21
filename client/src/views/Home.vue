<template>
  <div class="home">
    <Navbar />
    <div class="container-fluid mt-3">
      <div class="row">
        <div class="col-4">
          <AddProduct />
        </div>
        <div class="col-8" style="max-height: 100vh; overflow: auto;">
          <Card />
          <Card />
          <Card />
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
};
</script>
