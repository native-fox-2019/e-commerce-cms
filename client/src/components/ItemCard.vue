<template>
    <div @click="routeItem(item.id)" style="text-align: center; cursor:pointer">
        <!-- <router-link :to="{name:'Detail', params:{id:item.id}}"></router-link> -->
        <img id="item-image" v-bind:src="item.image_url" alt="" class="mb-2">
        <div class="mb-4">
          <h1>{{ item.name }}</h1>
          <p>{{ item.description }}</p>
          <span>Price: </span><b>{{ totalPriceIDR }}</b>
        </div>
    </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    routeItem(id) {
      this.$router.push(`/item/${id}`);
    },
  },
  computed: {
    totalPriceIDR() {
      return this.item.price.toLocaleString('en-US', { style: 'currency', currency: 'IDR' });
    },
  },
};
</script>

<style scoped>
#item-image{
  width:100%;
  max-width:150px;
  max-height:150px;
}

h1 {
 font-size: 16px;
 font-style: oblique;
}

p {
 font-size: 14px;
}
</style>
