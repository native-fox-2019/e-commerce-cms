<template>
    <div>
        <td>{{product.name}}</td>
            <td><img style="width: 35%;" alt="product image" :src="product.image_url"></td>
            <td>Rp.{{product.price.toLocaleString()}}</td>
            <td>{{product.stock}}</td>
            <td>
                <button class="btn btn-info m-3">Update</button>
                <button @click="deleteData(product.id)" class="btn btn-danger">Delete</button>
        </td>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    props: ['product'],
    methods: {
        deleteData(id){
            axios({
            method: 'delete',
            url: `${this.endpoint}/products/${id}`,
            headers: {token: localStorage.getItem('token')}
            })
                .then(()=>{
                    this.$store.dispatch('getData');
                })
                .catch(err=>{
                    console.log(err)
                })
      }
    }
}
</script>