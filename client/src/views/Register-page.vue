  <template>
  <div class="form-container">
    <Alert v-show="isError.status" :isError="isError" @hide="isError.status=!isError.status"/>
    <form @submit.prevent="register">
      <div>
        <label for="name">NAME</label>
      </div>
      <div>
        <input type="text" name="name" id="input-name" v-model="name" />
      </div>
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
        <input type="text" name="password" id="input-password" v-model="password" />
      </div>
      <div>
        <button>register now!</button>
      </div>
    </form>
    <div>
      already have an account?
      <router-link to="/">login here </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Alert from '../components/Alert'
// const url = 'http://localhost:3000'
const url = 'https://secure-eyrie-18193.herokuapp.com'
export default {
  name: 'register-page',
  components: {
    Alert
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      isError: {
        status: false,
        msg: ''
      }
    }
  },
  methods: {
    back () {

    },
    register () {
      axios({
        url: `${url}/user/register`,
        method: 'post',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(data => {
          localStorage.setItem('access_token', data.data.access_token)
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          this.isError.msg = err.response.data.msg.join(' ,  \n')
          this.isError.status = true
        })
    }
  }
}
</script>
