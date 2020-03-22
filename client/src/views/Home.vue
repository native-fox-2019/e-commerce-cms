<template>
  <div id="home">
    <Navbar />
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row>
          <v-col sm="12" md="6" lg="4" v-for="product in this.$store.state.products"
            :key="product.id">
                <Card :name="product.name" :category="product.category"
                :price="product.price" :stock="product.stock"
                :updatedAt="product.updatedAt.substring(0, 10).split('-').reverse().join('-')"
                :id="product.id"
                :image_url="product.image_url" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Card from '@/components/Card.vue';
// import AddProduct from '@/components/AddProduct.vue';

export default {
  name: 'Home',
  components: {
    Card,
    Navbar,
    // AddProduct,
  },
  created() {
    this.$store.dispatch('getProducts');
  },
};
</script>
