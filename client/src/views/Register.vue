<template>
  <div class="about">
    <h1>Register Page</h1>
    <form>
        <label>Username: </label>
        <input v-model="register.username" type="text" id="usernameRegister" name="usernameRegister"><br>
        <label>Email: </label>
        <input v-model="register.email" type="email" id="emailRegister" name="emailRegister"><br>
        <label>Password: </label>
        <input v-model="register.password" type="password" id="passwordRegister" name="passwordRegister"><br>
        <input type="submit" @click="submitRegister">
    </form>
   
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
        return {
            error: '',
            register: {
                username: '',
                email: '',
                password: ''
            }
        }
  },
  created(){

  },
  methods:{
    submitRegister(event){
        event.preventDefault();
        console.log(this.register.username)
        axios.post('http://localhost:3000/user/register', this.register)
        .then(result=>{
            console.log(result)
            window.location.replace('/login')
        })
        .catch(err=>{
            console.log(err)
            this.error = err.response
        })
    }
  }
  

}
</script>