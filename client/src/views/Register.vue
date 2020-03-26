<template>
  <div class="about">
    <div style="color:red">{{error}}</div>
    <h1>Register Page</h1>
    <form>
        <div class="form-group">
          <label>Username: </label><br>
          <input  v-model="register.username" type="email" style="width: 50%" placeholder="input username">
        </div>
        <div class="form-group">
          <label>Email address: </label><br>
          <input  v-model="register.email" type="email" style="width: 50%" placeholder="input e-mail">
        </div>
        <div class="form-group">
          <label>Password: </label><br>
          <input  v-model="register.password" type="email" style="width: 50%" placeholder="input password">
        </div>
        <div class="button">
          <button @click="submitRegister" type="submit" class="btn btn-primary">Submit</button>
          <button @click="cancelRegister" type="button" class="btn btn-warning">Cancel</button>
        </div>
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
            this.error = err.response.data
        })
    },
    cancelRegister(){
        window.location.replace('/login')
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