<template>
  <div class="home">
    <Navbar/>
    <div class="container">
      <div class="add-container">
        <button class="AddBtn" @click="add">ADD PRODUCT</button>
      </div>
      <div class="table-container">
        <div class="card" v-for="product in products" :key="product.id">
          <div>
            <img :src="product.imageURL" alt="">
          </div>
            <p>{{product.name}}</p>
          <div class="detail">
            <p>price: {{product.price}}</p>
            <p>available: {{product.stocks}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/navbar'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  data () {
    return {
      // products: null
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
    }
  },
  created () {
    this.$store.dispatch('getAll')
  }
}
</script>

<style>
.detail{
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  width: 100%;
}
.add-container {
  margin-bottom: 5vh;
  margin-top: 5vh;
}
table {
  max-height: 60vh;
  border: 2px #340068 solid;
  background-color: #B1EDE8;
}
td {
  padding: 3px;
  border: 2px  solid;
  background-color: white;
}
th {
  border: 2px #340068 solid;
  background-color: white;
}
.table-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center ;
  align-items: center;
  /* max-width: 60vh; */
}
.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border: 2px solid black;
  margin: 2vh;
  width: 20vw;
  height: 60vh;
  /* padding: 1vh; */
}
.home {
  min-height: 100vh;
  position: relative;
}
.AddBtn {
  border-radius: 7px;
  border-color: #B1EDE8;
  background-color: #6D435A;
  color: white;
  padding: 5px;
}
img {
  width: 20vw;
  height: 40vh
}
</style>
