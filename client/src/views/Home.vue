<template>
  <div class="home">
    <Navbar/>
    <div class="container">
      <div class="add-container">
      </div>
      <div class="card-container">
        <div class="card" v-for="product in products" :key="product.id" @click.prevent="edit(product.id)">
          <div>
            <img :src="product.imageURL" alt="">
          </div>
          <div class="detail">
            <h2>{{product.name}}</h2>
            <p>Rp. {{product.price}}</p>
            <p>stocks: {{product.stocks}}</p>
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

export default {
  name: 'Home',
  components: {
    Navbar
  },
  data () {
    return {
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
  background-color: whitesmoke;
  z-index: 1;
  margin-top: -8vh;
  overflow-y: auto ;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
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
  /* max-width: 80vh; */
}
.card:hover {
  transform: scale(1.08) ;
  box-shadow: 1vh 1vh gray;
}
.card {
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 10px;
  margin: 2.5vh;
  width: 20vw;
  cursor: pointer;
  height: 50vh;
}
.add {
  border: 2px solid ;
  justify-content: center;
  align-items: center;
  opacity: 60%;
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
</style>
