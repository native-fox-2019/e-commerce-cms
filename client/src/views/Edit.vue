<template>
    <div id="Edit">
        <div style="color:red">{{error}}</div>
        <h2> Edit your product as necessary </h2>
        <form>
            <div class="form-group">
            <label>Product name: </label><br>
            <input  v-model="edit.name" type="text" style="width: 50%" placeholder="input product name">
            </div>
            <div class="form-group">
            <label>Image url: </label><br>
            <input  v-model="edit.image_url" type="text" style="width: 50%" placeholder="input product image url">
            </div>
            <div class="form-group">
            <label>Price: </label><br>
            <input  v-model="edit.price" type="text" style="width: 50%" placeholder="input product price in Rp">
            </div>
            <div class="form-group">
            <label>Stock: </label><br>
            <input  v-model="edit.stock" type="text" style="width: 50%" placeholder="input product stock currently">
            </div>
            <div class="button">
            <button @click="submitEdit" type="submit" class="btn btn-primary">Submit</button>
            <router-link :to="{name:'MyProduct'}"><button type="button" class="btn btn-warning">Cancel</button></router-link>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
const local = `http://localhost:3000`
export default {
    name: "Edit", 
    data() {
        return {
            error: '',
            edit: []
        }
    },
    created() {
        this.getDetail()
    },
    methods: {
        getDetail(){
            let searchId = this.$route.params.id
            let token = localStorage.getItem('token')
            axios({
                method: "get",
                url: `${local}/products/myshow/${searchId}`,
                headers: {token: token}
            })
            .then(result=>{
                let produk = result.data
                console.log(produk)
                this.edit = produk
            })
            .catch(err=>{
                console.log(err)
                this.error=err.response.data
            })
        },
        submitEdit(event){
            event.preventDefault();
            console.log(this.edit)
            this.token = localStorage.getItem('token')
            axios({
                method: "put",
                url: `${local}/products/edit/${this.edit.id}`,
                data: this.edit,
                headers: {token: this.token}
            })
            .then(result=>{
                console.log(result)
                window.location.replace('/myproduct')
            })
            .catch(err=>{
                console.log(err)
                this.error = err.response.data
            })
        }
    }
}
</script>

<style>
.button{
  text-align: center;
  display: flex;
  justify-content: space-around;
  margin: 20px 80px
}
</style>