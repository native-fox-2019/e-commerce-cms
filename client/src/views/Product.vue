<template>
  <div>
    <div class="mb-3"><h3><u>Admin Page Product</u></h3></div>
    <div class="d-flex-justify-content-space-between flex-warp">
     <b-button pill variant="success" @click.prevent="Logout" class="float-right mr-5">Logout</b-button>
    <b-button pill variant="primary" @click.prevent="Add" class="float-left ml-5">Add</b-button></div>
  <div></div>
    <div class="mt-5">
    <div class="row ml-auto mr-auto">
      <div class="col-4" v-for="product in $store.state.products" :key="product.id" >
        <Card :PropProduct="product"></Card>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Card from "../components/Card";
export default {
  components: {
    Card
  },
created(){
  this.$store.dispatch("getAllProducts")
},
  methods: {
    Add(){
      this.$router.push('add')
    },
    Logout(){
      localStorage.clear()
      this.$router.push('login')
    }
  }
};
</script>

<style>
</style>