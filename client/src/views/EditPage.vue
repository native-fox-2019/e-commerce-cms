<template>
  <div class="divCenter">
    <form  v-on:submit.prevent="submitEdit()">
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
              <input class="btn btn-info" type="submit" value="Edit Watch">
          </div>
  </form>
  </div>
</template>
<script>

import axios from 'axios';

export default {
  data() {

      let editname=this.$store.state.productEdit.data[0].name
      let editimage_url=this.$store.state.productEdit.data[0].image_url
      let editprice=this.$store.state.productEdit.data[0].price
      let editstock=this.$store.state.productEdit.data[0].stock
    return {
        name: editname,
        price: editprice,
        image_url: editimage_url,
        stock: editstock,
      
    };
  },
  methods: {
      submitEdit(){
        let id = this.$store.state.productEdit.data[0].id
        axios({
          method:"PUT",
          url:`http://localhost:3000/products/${id}`,
          data:{
            name:this.name,
            image_url:this.image_url,
            price:this.price,
            stock:this.stock
          },
          headers:{token:localStorage.getItem('token')}
        }).then(response =>{

          this.$store.dispatch('updateData', response.data);
          this.$router.push('adminPage')
        })
      }
  },
};
</script>
