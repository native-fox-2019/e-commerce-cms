<template>
  <div class="form-container">
    <form @submit.prevent="login">
      <div class="input-email">
        <label for="email">EMAIL</label>
      </div>
      <div>
        <input type="text" name="email" id="input-email" v-model="email" />
      </div>
      <div>
        <label for="pasword">PASSWORD</label>
      </div>
      <div>
        <input type="password" name="password" id="input-password" v-model="password" />
      </div>
      <div>
      <button type="submit">Login</button>
      </div>
    </form>
    <div>
      dont have an account yet?
      <router-link to="/register">register here </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const url = 'http://localhost:3000'

export default {
  name: 'Login-page',
  components: {
    // Login
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios({
        url: `${url}/user/login`,
        method: 'post',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(data => {
          localStorage.setItem('access_token', data.data.access_token)
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err.response.data.msg)
        })
    }
  }
}
</script>
