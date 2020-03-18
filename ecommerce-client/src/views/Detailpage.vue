<template>
  <div class="divCenter">
    <form  v-on:submit.prevent="update(productDatum)">
      <div class="containerForm"> <span class="textForm"> Product's Name </span> </div>
      <div class="containerForm">
          <input type="text" class="input inputText"
          placeholder="e.g. Batman new 52" v-model="productDatum.name">
      </div>
      <div class="containerForm"> <span class="textForm"> Image's Url </span> </div>
      <div class="containerForm">
          <input type="text" class="input inputText"
          v-model="productDatum.image_url"
          placeholder="e.g. www.someimage.com/image.jpg">
      </div>
      <div class="containerForm"> <span class="textForm" min=1> stock </span> </div>
      <div class="containerForm">
          <input type="number" class="input inputText" placeholder="1"
          v-model="productDatum.stock">
      </div>
      <div class="containerForm"> <span class="textForm"> Price </span> </div>
      <div class="containerForm">
          <input  class="input inputText" v-model="productDatum.price" />
      </div>
          <div class="containerForm">
              <input class="btn" type="submit" value="Edit Comic">
          </div>
  </form>
  </div>
</template>
<script>

import axios from 'axios';

export default {
  data() {
    return {
      id: this.$route.params.id,
      productDatum: {
        name: '',
        image_url: '',
        price: '',
        stock: '',
      },
    };
  },
  methods: {
    getone(id) {
      axios({
        method: 'get',
        url: `${this.$store.state.axiosUrl}/product/${id}`,
        headers: { token: localStorage.getItem('token') },
      })
        .then((data) => {
          this.productDatum = data.data;
          // console.log(this.productDatum);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    update(object) {
      axios({
        method: 'PUT',
        url: `${this.$store.state.axiosUrl}/product/${this.id}`,
        headers: { token: localStorage.getItem('token') },
        data: {
          name: object.name,
          image_url: object.image_url,
          price: object.price,
          stock: object.stock,
        },
      })
        .then((data) => {
          console.log(data.data.data.name, ' ini data');
          this.$store.dispatch('pushData', data.data.data);
          this.$router.push('/adminpage');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getone(this.id);
  },
};
</script>
