<template>
  <div class="hello">
    <h3>Welcome to LuxWatch Admin Panel.</h3>
    <h3>Please Click Login to Continue</h3>
    <input type="submit" class="btn btn-danger" value="Login" v-on:click="loginButton">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    loginButton() {
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
  border-color: black;
  border-style : double;
  width: 30%;
  text-align: center;
  margin : 10px auto;
  background: white;
  padding: 15px;
}

h3{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 20px;
}

</style>
