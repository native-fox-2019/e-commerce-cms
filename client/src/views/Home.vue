<template>
  <div class="home">
    <Navbar/>
    <Alert v-show="isError.status" :isError="isError" @hide="isError.status=!isError.status"/>
    <Banner/>
    <div class="container">
      <div class="add-container">
      </div>
      <div>
        <h1>Products List</h1>
      </div>
      <div class="card-container">
       <div class="card" v-for="product in products" :key="product.id" >
          <div>
            <img :src="product.imageURL">
          </div>
          <div class="detail" @click.prevent="edit(product.id)">
            <h2>{{product.name}}</h2>
            <p>Rp. {{product.price}}</p>
            <p>stocks: {{product.stocks}}</p>
          </div>
          <div v-if="product.stocks === 0" class="delete-btn">
            <button @click.prevent="remove(product.id)" style="background-color=:red;">Remove</button>
          </div>
        </div>
        <div class="card add" @click="add">
          <i class="fas fa-plus-circle fa-8x" style=""></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/navbar'
import axios from 'axios'
import Alert from '../components/Alert'
import Banner from '../components/Banner'
// const url = 'http://localhost:3000'
const url = 'https://secure-eyrie-18193.herokuapp.com'

export default {
  name: 'Home',
  components: {
    Navbar,
    Banner,
    Alert
  },
  data () {
    return {
      isError: {
        status: false,
        msg: ''
      }
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    add () {
      this.$router.push({ name: 'Add' })
    },
    edit (id) {
      this.$router.push(`/edit/${id}`)
    },
    remove (id) {
      axios({
        url: `${url}/admin/products/${id}`,
        method: 'delete',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          this.$store.dispatch('getAll')
        })
        .catch(err => {
          this.isError.msg = err.response.data.msg
          this.isError.status = true
        })
    }
  },
  created () {
    this.$store.dispatch('getAll')
  }
}
</script>

<style>
.detail h2 {
  margin: 0;
  margin-top: 10px;
  min-height: 5vh;
  color: #6D435A;
}
.detail {
  border-radius: 10px;
  background-color: whitesmoke;
  overflow-y: auto ;
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
}
.add-container {
  margin-bottom: 5vh;
  margin-top: 15vh;
}
.card-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center ;
  align-items: center;
}
.card:hover {
  transform: scale(1.08) ;
  box-shadow: 1vh 1vh gray;
}
.add {
  border-radius: 10px;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center ;
  border-radius: 10px;
  margin: 2.5vh;
  width: 20vw;
  cursor: pointer;
  height: 55vh;
  border: 2px solid ;
  justify-content: center;
  align-items: center;
}
.home {
  min-height: 100vh;
  color: #6D435A;
}
img {
  width: 20vw;
  height: 30vh;
  border-radius: 10px;
}
.remove-btn button{
  color: red;
  border:2px red;
}
.remove-btn:hover {
  transform: scale(1.08);
}
</style>
