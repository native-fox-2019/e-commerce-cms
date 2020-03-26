<template>
<div class="card text-white bg-dark mb-3" style="max-width: 40rem;">
  <div class="card-body">
    <h3>Welcome to Admin Panel!</h3>
    <h3>Please Click Login to Continue</h3>
  </div>
  <div>
    <input type="submit" class="btn btn-warning" value="Login" v-on:click="loginButton">
  </div>
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
  .card {
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
