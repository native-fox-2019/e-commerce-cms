<template>
    <div class="login container p-4 bg-white text-black" style="margin-top:300px; border: 1px solid black;">
      <h1>Register Page</h1>
    <form class="mt-5" @submit.prevent="doRegister">
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="password"
        />
      </div>
      <div class="form-group form-check">
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'Register',
    data() {
        return {
            name: null,
            email: null,
            password: null
        }
    },
    created() {
        this.empty()
    },
    methods: {
        doRegister() {
            axios.post('http://localhost:3000/users/register', {
                name: this.name,
                email: this.email,
                password: this.password
            })
            .then(data => {
                console.log(data.data.access_token)
                localStorage.setItem('access_token', data.data.access_token) 

            })
            .catch(err => {
                console.log(err)
            })
        },
        empty() {
            this.name = null,
            this.email = null,
            this.password = null
        }
    }
}
</script>