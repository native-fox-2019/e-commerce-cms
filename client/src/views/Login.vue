<template>
 <div class="container mt-5">
   <h1 class="text-center mb-5">Admin Login</h1>
   <form class="login" @submit.prevent="login">
     <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" required v-model="email" placeholder="Email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control"
        required v-model="password" placeholder="Password">
      </div>
     <button type="submit" class="btn btn-primary">Login</button>
   </form>
 </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      axios.post('http://localhost:3000/user/login', {
        email: this.email,
        password: this.password,
      })
        .then((data) => {
          console.log(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
