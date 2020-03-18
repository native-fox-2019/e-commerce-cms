<template>
<div class="itemContainer border">
  <div class="titleContainer">
  <span class="itemTitle"> {{this.data.name}}</span>
  </div>
  <div class="descriptionContainer" >
      <img :src="this.data.image_url" style="width:120px; height:170px;">
      <span> price : {{this.data.price}}</span>
      <span> stock : {{this.data.stock}} </span>
      <div class="edit">
        <router-link :to="{ name: 'Detail', params: { id: this.data.id }}">
          <button class="btn"><i class="fa fa-bars"></i></button>
        </router-link>
        <button class="btn" @click="deleteId()"> <i class="fa fa-trash"></i></button>
      </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';

export default {
  props: ['data'],
  data() {
    return {
      id: this.data.id,
    };
  },
  methods: {
    deleteId() {
      axios({
        method: 'delete',
        url: `${this.$store.state.axiosUrl}/product/${this.id}`,
        headers: { token: localStorage.getItem('token') },
      })
        .then((data) => {
          this.$store.dispatch('deleteData', data.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
