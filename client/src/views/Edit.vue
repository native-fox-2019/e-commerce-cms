<template>
  <div class="mr-5 ml-5">
    <b-form @reset.prevent="onReset">
        <div><h3><u>Edit Form</u></h3></div>  
      <b-form-group label="Name:">
        <b-form-input
          v-model="name"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group  label="Product Image:">
        <b-form-input
          v-model="image_url"
          type="url"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group  label="Price:">
        <b-form-input
          v-model="price"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group  label="Stock:">
        <b-form-input
          v-model="stock"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" @click.prevent="update">Submit</b-button>
      <b-button variant="danger" @click.prevent="back">Back</b-button>

    </b-form>
  </div>
</template>

<script>
import axios from "axios"
  export default {
    data() {
      let editName=this.$store.state.productEdit.data.name
      let editImage_url=this.$store.state.productEdit.data.image_url
      let editPrice=this.$store.state.productEdit.data.price
      let editStock=this.$store.state.productEdit.data.stock
      return {
          name: editName,
          image_url: editImage_url,
          price: editPrice,
          stock: editStock
      }
    },
    methods: {

      back(){
          this.$router.push('product')
      },
      update(){
        let id = this.$store.state.productEdit.data.id
        axios({
          method:"PUT",
          url:`https://hidden-beyond-35816.herokuapp.com/product/${id}`,
          data:{
            name:this.name,
            image_url:this.image_url,
            price:this.price,
            stock:this.stock
          },
          headers:{token:localStorage.getItem('token')}
        }).then(response =>{
          this.$store.dispatch('updateData', response.data);
          this.$router.push('product')
        })
      }

    }
  }
</script>