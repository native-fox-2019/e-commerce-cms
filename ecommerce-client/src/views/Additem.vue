<template>
  <div class="divCenter">
    <form  v-on:submit.prevent="axiosAdd(inputs)">
      <div class="containerForm"> <span class="textForm"> Product's Name </span> </div>
      <div class="containerForm">
          <input type="text" class="input inputText"
          placeholder="e.g. Batman new 52" v-model="inputs.name">
      </div>
      <div class="containerForm"> <span class="textForm"> Image's Url </span> </div>
      <div class="containerForm">
          <input type="text" class="input inputText" placeholder="e.g. www.someimage.com/image.jpg"
          v-model="inputs.image_url">
      </div>
      <div class="containerForm"> <span class="textForm" min=1> stock </span> </div>
      <div class="containerForm">
          <input type="number" class="input inputText" placeholder="1" v-model="inputs.stock">
      </div>
      <div class="containerForm"> <span class="textForm"> Price </span> </div>
      <div class="containerForm">
           <input v-model.lazy="inputs.price" class="input inputText" v-money="money" />
      </div>
          <div class="containerForm">
              <input class="btn" type="submit" value="Add Comic">
          </div>
  </form>
  </div>
</template>
<script>

import { VMoney } from 'v-money';
import axios from 'axios';
import Swal from 'sweetalert2';

const axiosUrl = 'http://localhost:3000';

export default {
  data() {
    return {
      inputs: {
        name: '',
        price: '',
        image_url: '',
        stock: '',
      },
      money: {
        decimal: '.',
        thousands: ',',
        prefix: 'Rp',
        masked: true,
        precision: 0,
      },
    };
  },
  directives: { money: VMoney },
  methods: {
    axiosAdd(inputs) {
      let numbers = inputs.price.match(/[+-]?\d+(?:\.\d+)?/g);
      numbers = numbers.join('');
      numbers = Number(numbers);
      axios({
        method: 'post',
        url: `${axiosUrl}/product/`,
        headers: { token: localStorage.getItem('token') },
        data: {
          name: inputs.name,
          image_url: inputs.image_url,
          price: numbers,
          stock: inputs.stock,
        },
      })
        .then((data) => {
          console.log(data);
          this.$store.dispatch('pushData', data);
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
              title: 'cannot add Product',
              html: `<span>${arrError.join('<br>')}</span>`,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'cannot add Product',
              html: `<span>${err.response.data.msg}</span>`,
            });
          }
          // swal
        });
    },
  },
};
</script>
