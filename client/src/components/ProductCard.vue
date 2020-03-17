<template>
  <div>
    <div v-for="product in allProducts" :key="product.id">
      <h1>{{product.name}}</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProductCard',
  created() {
    this.getAllTodos();
  },
  computed: mapGetters(['allProducts']),
  methods: {
    ...mapActions(['getAllTodos']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
