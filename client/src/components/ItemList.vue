<template>
  <div>
    <div class="banner">
        <h2>Get new homeschooling materials for your needs!</h2>
    </div>
    <div class="container" style="display:flex; justify-content:center;">
      <div v-if="isLoadItem" style="text-align:center"><em>Loading...</em></div>
      <div v-else>
        <h3>On the store</h3>
        <hr>
        <div style="display: flex; flex-wrap: wrap;">
          <div v-for="item in items" :key="item.id" class="list-box">
            <ItemCard :item="item"
            class="m-2 border dark rounded item-card"
            style="height:20em;"></ItemCard>
          </div>
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
    };
  },
  computed: {
    items() {
      return this.$store.state.itemsArr;
    },
  },
  created() {
    this.$store.dispatch('getAllItems', this.finishLoading());
  },
  methods: {
    finishLoading() {
      this.isLoadItem = false;
    },
  },
};
</script>

<style>
.banner {
  color: white;
  margin: 0em 0em 3em 0em;
  height: 40vh;
  background: #41af6b;
  padding: 2em 3em;
}

.banner h2 {
  font-size: 2.5em;
}

.list-box {
  width:100%;
}

@media (min-width: 930px) {
  .list-box {
    width:33.3%;
  }
}

</style>
