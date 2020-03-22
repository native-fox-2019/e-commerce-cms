<template>
    <div id="Add">
    <div style="color:red">{{error}}</div>
    <h2> Add your product </h2>

        <form>
            <div class="form-group">
            <label>Product name: </label><br>
            <input  v-model="add.name" type="text" style="width: 50%" placeholder="input product name">
            </div>
            <div class="form-group">
            <label>Image url: </label><br>
            <input  v-model="add.image_url" type="text" style="width: 50%" placeholder="input product image url">
            </div>
            <div class="form-group">
            <label>Price: </label><br>
            <input  v-model="add.price" type="text" style="width: 50%" placeholder="input product price in Rp">
            </div>
            <div class="form-group">
            <label>Stock: </label><br>
            <input  v-model="add.stock" type="text" style="width: 50%" placeholder="input product stock currently">
            </div>
            <div class="button">
            <button @click="submitAdd" type="submit" class="btn btn-primary">Submit</button>
            <router-link :to="{name:'MyProduct'}"><button type="button" class="btn btn-warning">Cancel</button></router-link>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
const local = 'http://localhost:3000'
export default {
    name: "Add",
    data (){
        return {
            error: '',
            token: '',
            add: {
                name: '',
                image_url: '',
                price: '',
                stock: ''
            }
        }
    },
    methods: {
        initial(){
            this.add= {
                name: '',
                image_url: '',
                price: '',
                stock: ''
            }
        },
        submitAdd(event){
            event.preventDefault();
            console.log(this.add)
            this.token = localStorage.getItem('token')
            axios({
                method: "POST",
                url: `${local}/products/create`,
                data: this.add,
                headers: {token:this.token}
            })
            .then(result=>{
                console.log(result)
                this.initial()
                 window.location.replace('/myproduct')
            })
            .catch(err=>{
                console.log(err.response)
                this.error = err.response.data
            })
        }
    }
}

</script>