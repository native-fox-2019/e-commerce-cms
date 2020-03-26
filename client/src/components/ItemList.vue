<template>
  <div>
    <div class="container" style="display:flex; justify-content:center;">
      <div v-if="isLoadItem">Loading...</div>
      <div v-else class="mt-5">
        <h1 style="text-align:center">Item List</h1>
        <hr>
        <div v-for="item in items" :key="item.id" style="display: inline-block">
          <ItemCard :item="item" class="m-2 p-2 border dark rounded" ></ItemCard>
        </div>
      </div>
    </div>
    <div>
      <ItemCard v-if="currentItem" :item="currentItem"></ItemCard>
    </div>
  </div>
</template>

<script>
import ItemCard from '@/components/ItemCard.vue';
// import appAxios from '../../config/appAxios';

export default {
  name: 'ItemList',
  components: {
    ItemCard,
  },
  data() {
    return {
      isLoadItem: true,
      currentItem: null,
      showForm: false,
    };
  },
  created() {
    this.$store.dispatch('getAllItems', this.finishLoading());
  },
  methods: {
    finishLoading() {
      this.isLoadItem = false;
    },
  },
  computed: {
    items() {
      return this.$store.state.itemsArr;
    },
  },
};
</script>

<style>
.item-card {
  max-width: 25%;
}
</style>
