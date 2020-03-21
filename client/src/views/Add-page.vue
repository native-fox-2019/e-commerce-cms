<template>
  <div class="add-page">
    <div class="form-container">
    <form @submit.prevent="add">
      <Form :singledata="singledata"/>
      <button>Add</button>
    </form>
    </div>
    <div>
      <router-link to="/home"><button>back</button></router-link>
    </div>
    <Alert v-show="isError.status" :isError="isError" @hide="isError.status=!isError.status"/>
  </div>
</template>

<script>
import Form from '../components/add-edit-input.vue'
import Alert from '../components/Alert.vue'
import axios from 'axios'
const url = 'https://secure-eyrie-18193.herokuapp.com'

export default {
  name: 'Add',
  components: {
    Form,
    Alert
  },
  data () {
    return {
      isError: {
        status: false,
        msg: ''
      },
      singledata: {
        name: '',
        price: '',
        stocks: '',
        imageURL: ''
      }
    }
  },
  methods: {
    add () {
      axios({
        url: `${url}/admin/products`,
        method: 'post',
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
        .then(data => {
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          this.isError.status = true
          this.isError.msg = err.response.data.msg.join(', \n')
        })
    }
  }
}
</script>

<style>
.add-page {
  display: flex;
  flex-flow: column wrap;;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.form-container {
  min-height: 90vh;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-content: center;
}
</style>
