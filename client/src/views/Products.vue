<template>
  <div class="products">
    Products yang tersedia:
    <div class="produk" v-for="produk in products" :key="produk.id">
      <span>{{produk.name}}</span>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
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
      axios.get('http://localhost:3000/products/show')
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
