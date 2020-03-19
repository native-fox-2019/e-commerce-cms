<template>
    <div class= "row d-flex flex-column m-3">
<input type="text" v-model="email"/>
<input type="password" v-model="password"/>
<input type="submit" @click.prevent="registerUser">
    </div>
</template>
<script>
import axios from "axios"
export default {
    data(){
return{
    email:"",
    password:""
}
    },

methods:{
    registerUser(){
        console.log("ini email",this.email,"ini password",this.password)
        axios({
            method:"POST",
            url:"http://localhost:3000/user/register",
            data: {
                email:this.email,
                password:this.password
            },
        }).then(response => {
            localStorage.setItem("token",response.data.token)
            this.$router.push('product')
        }).catch(err =>{
            console.log(err.response)
        })
    }
}
    
}
</script>