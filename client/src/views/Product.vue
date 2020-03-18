<template>
  <div>
    <div class="row ml-auto mr-auto">
      <div class="col-4" v-for="product in $store.state.products" :key="product.id" >
        <Card :PropProduct="product"></Card>
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
  methods: {}
};
</script>

<style>
</style>