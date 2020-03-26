<template>
  <div class="divCenter">
    <form  v-on:submit.prevent="submitAdd()">
      <div class="containerForm"> <span class="textForm"> Product's Name </span> </div>
      <div class="containerForm">
          <input type="text" class="input inputText"
           v-model="name">
      </div>
      <div class="containerForm"> <span class="textForm"> Image's Url </span> </div>
      <div class="containerForm">
          <input type="text" class="input inputText"
          v-model="image_url">
      </div>
      <div class="containerForm"> <span class="textForm" min=1> stock </span> </div>
      <div class="containerForm">
          <input type="number" class="input inputText"  v-model="stock">
      </div>
      <div class="containerForm"> <span class="textForm"> Price </span> </div>
      <div class="containerForm">
           <input type ="number" v-model="price" class="input inputText" >
      </div>
          <div class="containerForm">
              <input class="btn btn-success mt-3" type="submit" value="Add Watch">
          </div>
  </form>
  </div>
</template>
<script>

import axios from 'axios';

export default {
  data() {
    return {

        name: '',
        price: '',
        image_url: '',
        stock: '',
      
    };
  },
  methods: {
    submitAdd() {
      axios({
        method: 'post',
        url: `http://localhost:3000/products/`,
        headers: { token: localStorage.getItem('token') },
        data: {
          name: this.name,
          image_url: this.image_url,
          price: this.price,
          stock: this.stock,
        },
      })
        .then(result => {
          this.$store.dispatch('addNewData')
          this.$router.push('/adminPage');
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
};
</script>
