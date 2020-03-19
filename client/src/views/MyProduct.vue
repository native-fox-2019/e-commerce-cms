<template>
  <div id="myproducts">
    <div>
    <button @click="logout" type="button">Logout</button>
    </div>
    Products yang telah saya input:
   
   <div> 
   <div v-for="item in myproducts" :key="item.id" >{{item.name}}</div>
   </div>
       
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import axios from 'axios'
export default {
    name: 'myproducts',
    data() {
        return {
            error: '',
            //posts: [],
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
                methods: "get",
                url: 'http://localhost:3000/products/myshow',
                headers: {token: token}
            })
            .then(result=>{
                console.log('data')
                let produk = result.data
                console.log(produk)
                this.myproducts = produk
            })
            .catch(err=>{
                console.log('err')
                console.log(err)
                this.error=err
            })
        },
        logout(){
            localStorage.removeItem('token')
            window.location.replace('/login')
        }
    }
}
    // created:function(){
    //     this.token = localStorage.getItem('token')
    //     if (this.token){
    //         this.getData()
    //     } else {
    //         window.location.replace('/login')
    //     }
    //     this.getData()
    // },
    // methods: {
    //     getData(){
    //         console.log("masuk getData method")
    //         let data = this.$store.dispatch('getProducts')
    //         console.log(data+"<<<data")
    //     }
    // }
//     mounted(){
//         this.$store.dispatch('getProducts')
//         let a = this.$store.dispatch('getProducts')
//         console.log(a)
//         //console.log('mounted')
//     },
//     computed: mapState(['posts'])
    
// }

</script>
