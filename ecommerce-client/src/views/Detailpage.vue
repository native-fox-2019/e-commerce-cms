<template>
  <div class="divCenter">
    <div class="yea" v-if="level==='admin'">
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
          <div class="containerForm" >
              <input class="btn" type="submit" value="Edit Comic">
          </div>
      </form>
    </div>
    <div class="divCenter">
      <div class="detailContainer">
        <img :src="productDatum.image_url" style="width:240px; height:340px;">
      </div>
      <div class="detailContainer">
        <span class="inputText"> {{productDatum.name}}</span>
        <span class="inputText"> stock: {{productDatum.stock}} </span>
        <i  style="color:blue; font-size :40px" class="fa fa-shopping-cart"></i>
      </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios';
import Swal from 'sweetalert2';

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
      level: localStorage.getItem('level'),
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
      console.log(object.price, 'price');
      console.log(object.stock, 'stock');
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
          // swal
          if (Array.isArray(err.response.data.msg)) {
            console.log('masuk sini');
            const arrError = [];
            for (let i = 0; i < err.response.data.msg.length; i += 1) {
              arrError.push(err.response.data.msg[i]);
            }
            console.log(arrError, 'ini array');
            Swal.fire({
              icon: 'error',
              title: 'cannot update Product',
              html: `<span>${arrError.join('<br>')}</span>`,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'cannot update Product',
              html: `<span>${err.response.data.msg}</span>`,
            });
          }
          // swal
          console.log(err);
        });
    },
  },
  created() {
    this.getone(this.id);
  },
};
</script>
