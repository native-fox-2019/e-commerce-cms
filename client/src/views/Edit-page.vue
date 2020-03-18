<template>
  <div>
    <Navbar/>
    <div class="div-container">
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
import Navbar from '../components/navbar'
import axios from 'axios'
// const id = Number(this.$route.params.id)
const url = 'http://localhost:3000'
// console.log(id)
export default {
  name: 'Edit',
  data () {
    return {
      id: null,
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
    Navbar
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
          // console.log(data.data)
          this.singledata.name = data.data.name
          this.singledata.price = data.data.price
          this.singledata.stocks = data.data.stocks
          this.singledata.imageURL = data.data.imageURL
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
        .then(data => {
          this.$router.push({ name: 'Home' })
        })
        .catch(err => console.log(err))
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
