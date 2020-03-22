<template>
  <div id="myproducts">
    <div>
       <h2>This is admin page</h2>
       <button @click="logout" type="button" class="btn btn-danger">Logout</button>
    </div>
    <h1>My Product:</h1>
    <p> To add more product, please click add </p>
        <router-link :to="{name:'Add'}"><button type="button" class="btn btn-primary">Add</button></router-link>
   
   <div class="products"> 
   <div v-for="item in myproducts" :key="item.id" class="produk">
        <div class="produkname">{{item.name}}</div>
        <img :src="item.image_url">
        <div>Rp{{item.price}},00</div>
        <div>Stock: {{item.stock}}</div>
        <div>
            <router-link :to="{name:'Edit', params:{id: item.id} }"><button>Edit</button></router-link>
            <button @click="delproduct(item.id)" type="button">Delete</button>
        </div>
        </div>
   </div>
   <hr>
   <router-view/>
       
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import axios from 'axios'
let local = "http://localhost:3000"
export default {
    name: 'myproducts',
    data() {
        return {
            error: '',
            myproducts: [],
            }
    },
    created(){
    this.getMine()
    },
    methods:{
        getMine(){
            let token = localStorage.getItem('token')
            console.log(token)
            axios({
                method: "get",
                url: `${local}/products/myshow`,
                headers: {token: token}
            })
            .then(result=>{
                let produk = result.data
                console.log(produk)
                this.myproducts = produk
            })
            .catch(err=>{
                console.log(err)
                this.error=err
            })
        },
        logout(){
            localStorage.removeItem('token')
            window.location.replace('/login')
        },
        delproduct(id){
            let token = localStorage.getItem('token')
            let searchId = id
            console.log(searchId)
            console.log(token)
            axios({
                method: "delete",
                url: `${local}/products/delete/${searchId}`,
                headers: {token: token}
            })
            .then(result=>{
                console.log('sukses')
                console.log(result)
                 window.location.replace('/myproduct')
            })
            .catch(err=>{
                console.log('error')
                console.log(err)
            })
        }
    }
}

</script>

<style>
h1 {
    margin-top: 40px;
    padding-top: 40px
}

.products {
  display: flex;
  flex-direction: row;
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

button {
    color: blue;
    font-size: 20px;
    text-align: center;
    font-family: "Times New Roman", Times, serif;  
}
</style>