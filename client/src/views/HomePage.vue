<template>
  <div>
    <div>
      <NavBar />
    </div>
    <img alt="Vue logo" src="../assets/logo.png" style="width : 15%">
    <div>
      <h1>Stock List</h1>
      <modalForm />
    </div>
    <div class="container" style="padding : 0">
      <TableProduct />
    </div>
  </div>
</template>
<script>
import TableProduct from '../components/TableProduct'
import NavBar from '../components/NavBar'
import modalForm from '../components/modalForm'
export default {
  name: 'HomePage',
  components : {
    TableProduct, NavBar, modalForm
  },
  data () {
    return {}
  }
}
</script>
