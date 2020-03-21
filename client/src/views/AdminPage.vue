<template>
    <div>
        <div class="divAdmin">
          <a class="btn" @click="addForm()"> Add New Watch </a>
        </div>
        <hr>
        <div class="divCenter">
          <CardProduct v-for="data in $store.state.products" :key="data.id" :data="data">
          </CardProduct>
        </div>
        <div>

        </div>
    </div>
</template>
<script>
import CardProduct from '../components/CardProduct.vue';
export default {

  components: {
    CardProduct,
  },
  methods: {
    addForm() {
      this.$router.push('/addPage');
    },
  },
  created() {
    this.$store.dispatch('getAllProducts');
  },
};
</script>