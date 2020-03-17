<template>
  <div>
      <h2>Admin Login</h2>
      <form>
        <label for="email">Email:</label><br>
        <input type="email" v-model="email_login"><br>
        <label for="password">Password:</label><br>
        <input type="password" v-model="password_login"><br><br>
        <input type="submit" value="Login">
      </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email_login: null,
      password_login: null
    }
  }
}
</script>
