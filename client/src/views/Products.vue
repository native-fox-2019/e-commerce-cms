<template>
<div>
  <h1>Available Products:</h1>
  <div class="products">
    <div class="produk" v-for="produk in products" :key="produk.id">
        <div class="produkname">{{produk.name}}</div>
        <img :src="produk.image_url">
        <div>Rp{{produk.price}},00</div>
        <div>Stock: {{produk.stock}}</div>
    </div>

  </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
let local = "http://localhost:3000"
export default {
  data(){
        return {
            error: '',
            products: [],
        }
  },
  created(){
    this.getProducts()
  },
  methods:{
    getProducts(){
      axios.get(`${local}/products/show`)
      .then(result=>{
        console.log(result.data)
        this.products = result.data
      })
      .catch(err=>{
        this.error=err
      })
    }
  }


}
</script>

<style>
.products {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center
}

.produk {
  margin: 10px;
  padding: 10px;
  border: 5px solid blue;
  background-color: lightblue;
}

.produkname {
  color: blue;
  font-weight: bold
}

img {
  width: 100px;
  height: 100px
}

</style>
