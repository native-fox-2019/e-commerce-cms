<template>
  <div>
    <Navbar/>
    <Alert v-show="isError.status" :isError="isError" @hide="isError.status=!isError.status"/>
    <div class="form-container">
      <form @submit.prevent="edit">
        <Form :singledata="singledata" />
        <div>
          <button>Edit</button>
        </div>
      </form>
      <div>
        <router-link to="/home"><button>back</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Form from '../components/add-edit-input.vue'
import Alert from '../components/Alert.vue'
import Navbar from '../components/navbar'
import axios from 'axios'
const url = 'https://secure-eyrie-18193.herokuapp.com'

export default {
  name: 'Edit',
  data () {
    return {
      id: null,
      isError: {
        status: false,
        msg: ''
      },
      singledata: {
        name: '',
        price: 0,
        stocks: 0,
        imageURL: ''
      }
    }
  },
  components: {
    Form,
    Navbar,
    Alert
  },
  created () {
    this.id = this.$route.params.id
  },
  methods: {
    getOne () {
      axios({
        url: `${url}/admin/products/` + this.id,
        method: 'get',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          this.singledata.name = data.data.name
          this.singledata.price = data.data.price
          this.singledata.stocks = data.data.stocks
          this.singledata.imageURL = data.data.imageURL
        })
        .catch(() => {
          this.$router.push('/home')
        })
    },
    edit () {
      axios({
        url: `${url}/admin/products/` + this.id,
        method: 'put',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: this.singledata.name,
          price: this.singledata.price,
          stocks: this.singledata.stocks,
          imageURL: this.singledata.imageURL
        }
      })
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          this.isError.msg = err.response.data.msg.join(' ,  \n')
          this.isError.status = true
        })
    }
  },
  watch: {
    id: function () {
      this.getOne()
    }
  }
}
</script>

<style>
button {
  border-radius: 7px;
}

</style>
