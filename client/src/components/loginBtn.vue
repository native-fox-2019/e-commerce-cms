<template>
  <v-btn icon>
    <div @click="toLoginPage" >
      <v-icon>mdi-account-circle</v-icon>
      <p>Login</p>
    </div>
  </v-btn>
</template>

<script>
export default {
  name: 'loginBtn',
  methods: {
    toLoginPage() {
      this.$router.push({path: '/login' })
    }
  }
}
</script>

<style>

</style>