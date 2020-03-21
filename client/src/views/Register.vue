<template>
    <div class= "row d-flex flex-column m-3">
<input type="text" v-model="email"/>
<input
      :type="showPassword?'text':'password'"
      v-model="password"
      class="form-control"
    />
    <div class="form-group form-check">
      <input type="checkbox" v-model="showPassword" />Show Password
      <label class="form-check-label" for="exampleCheck1"></label>
    </div>
    <input type="submit" @click.prevent="registerUser">
    </div>
</template>
<script>
import axios from "axios"
export default {
    data(){
return{
    email:"",
    password:"",
    showPassword:false
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