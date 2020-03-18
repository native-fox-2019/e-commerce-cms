<template>
  <div>
    <table class="table table-striped border" border="1">
      <thead>
        <tr>
          <!-- <th scope="col">No</th> -->
          <th scope="col">Name</th>
          <!-- <th scope="col">Image Url</th> -->
          <th scope="col">Image</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <!-- <th scope="row"></th> -->
          <td>{{product.name}}</td>
          <!-- <td><a>{{product.image_url}}</a></td> -->
          <td><img :src="product.image_url" style="width : 30%"></td>
          <td>Rp.{{product.price.toLocaleString()}}</td>
          <td>{{product.stock}}</td>
          <td><button class="btn btn-info">Edit</button><button class="btn btn-danger">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>    
</template>

<script>
import axios from 'axios'
let url = 'http://localhost:3000'
export default {
    data() {
      return {
        products : null
      }
    },
    created (){
      this.getProduct()
    },
    methods : {
      getProduct(){
        axios({
          method : 'get',
          url : `${url}/products/`,
          headers : {
            access_token : localStorage.getItem('token')
          }
        })
        .then(response=>{
          this.products = response.data.data
        })
      }
    },
    // watch : {
    //   products()
    // }
}
</script>
