<template>
<div class="container" style="max-width: 50%;">
  <h1>Login Your Account</h1>
  <LoginCard 
    @login="login"
  />
</div>
</template>

<script>
import axios from 'axios';
import LoginCard from '../components/loginCard.vue';
const base_url = 'http://localhost:3000';
export default {
    components: {
        LoginCard
    },
    methods: {
      login(data) {
        let email = data.email;
        let password = data.password;
        axios({
            method: 'POST',
            url: base_url + '/users/login',
            data: {
                email,
                password
            }
        }).then(({ data }) => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });

      }
    }
}
</script>