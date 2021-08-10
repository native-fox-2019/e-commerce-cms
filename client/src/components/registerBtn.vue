<template>
  <v-btn icon @click="toRegister">
            <div>
              <v-icon>mdi-account-circle</v-icon>
              <p>Register</p>
        </div>
      </v-btn>
</template>
<script>
export default {
  name: "registerBtn",
  methods: {
    toRegister() {
      this.$router.push({path: '/register'})
    }
  }
}
</script>

<style>

</style>