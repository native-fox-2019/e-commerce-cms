<template>
  <div class="MainPage py-3">
    <div class="container d-flex flex-column justify-content-start">

      <Navbar/>

      <nav class="table-container shadow">
        <ProductList class="navbar navbar-light table-container p-0 d-flex flex-column justify-content-start"/>
      </nav>

      <ProductForm/>

    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import ProductForm from '../components/ProductForm.vue'
import ProductList from '../components/ProductList.vue'

export default {
  name: 'MainPage',
  components: {
    Navbar,
    ProductList,
    ProductForm
  }
}
</script>