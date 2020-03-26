<template>
    <div @click="routeItem(item.id)" style="cursor:pointer">
        <!-- <router-link :to="{name:'Detail', params:{id:item.id}}"></router-link> -->
        <img id="item-image" v-bind:src="item.image_url" alt="">
        <h1>{{ item.name }}</h1>
        <p>{{ item.description }}</p>
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
