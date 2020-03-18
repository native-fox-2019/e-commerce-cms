<template>
  <div>
    <form @submit.prevent="add">
      <Form :singledata="singledata"/>
      <div>
        <button>Add</button>
      </div>
    </form>
    <div>
      <router-link to="/home"><button>back</button></router-link>
    </div>
  </div>
</template>

<script>
import Form from '../components/add-edit-input.vue'
import axios from 'axios'
const url = 'http://localhost:3000'
export default {
  name: 'Add',
  data () {
    return {
      singledata: {
        name: '',
        price: '',
        stocks: '',
        imageURL: ''
      }
    }
  },
  components: {
    Form
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
        .catch(err => console.log(err.response.data.msg))
    }
  }
}
</script>

<style>

</style>
