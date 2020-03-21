<template>
<div class="col-10">
    <tr class="row">
      <td class="col">No.</td>
      <td class="col">username</td>
      <td class="col">email</td>
      <td class="col">admin</td>
    </tr>
  <hr>
    <tr class="row" v-for="(data, index) in getData" :key="data.id">      
      <td class="col">{{index + 1}}</td>
      <td class="col">{{data.username}}</td>
      <td class="col">{{data.email}}</td>
      <td class="col">{{data.admin}}</td>
      
    </tr>
</div>
</template>

<script>
export default {
  name: 'adminList',
  computed: {
    getData() {
      return this.$store.state.allAdmins
    }
  },
  created() {
    this.$store.dispatch("getAdmins") 
  }
}
</script>

<style>

</style>