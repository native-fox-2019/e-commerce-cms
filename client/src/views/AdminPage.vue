<template>
  <div>
    <div class="divAdmin mb-3">
      <a class="btn btn-success" @click.prevent="addForm()">Add New Watch</a>
    </div>
    <div>
      <a class="btn btn-secondary" @click.prevent="logout()">Logout</a>
    </div>
<div class="container">
    <div class="divCenter row">
      <CardProduct class="col-6 mx-3 my-3" v-for="data in $store.state.products" :key="data.id" :data="data"></CardProduct>
    </div>
</div>

  </div>
</template>
<script>
import CardProduct from "../components/CardProduct.vue";
export default {
  components: {
    CardProduct
  },
  methods: {
    addForm() {
      this.$router.push("addPage");
    },
    logout() {
      localStorage.clear();
      this.$router.push("loginPage");
    }
  },
  created() {
    this.$store.dispatch("getAllProducts");
  }
};
</script>