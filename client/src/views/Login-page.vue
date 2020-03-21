<template>
  <div class="form-container">
    <Alert v-show="isError.status" :isError="isError" @hide="isError.status=!isError.status"/>
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
import Alert from '../components/Alert'
// const url = 'http://localhost:3000'
// const url = 'http://secure-eyrie-18193.herokuapp.com'
const url = 'https://secure-eyrie-18193.herokuapp.com'

export default {
  name: 'Login-page',
  components: {
    Alert
  },
  data () {
    return {
      email: '',
      password: '',
      isError: {
        status: false,
        msg: ''
      }
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
          this.isError.msg = err.response.data.msg
          this.isError.status = true
        })
    }
  }
}
</script>
