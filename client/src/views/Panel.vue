<template>
  <div class="panel">
   <h3> Welcome Back Admin! </h3>
            <input type="button" class="btn btn-dark" value="View Product" v-on:click="login">
            <input type="button" class="btn btn-dark" value="Add Product" v-on:click="login">
  </div>
</template>
<script>


export default {
  name: 'Panel',
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      email: '',
      password: '',
    };
  },
  Components: {

  },
  created() {

  },
  methods: {
  },
};
</script>
<style scoped>
.panel {
  border-color: black;
  border-style : double;
  width: 30%;
  text-align: center;
  margin : 140px auto;
  background: white;
  padding: 15px;
}
.btn-dark {
  margin-top: 20px;
  margin-left : 15px;
  padding-left: 15px;
}
</style>
