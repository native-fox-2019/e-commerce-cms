<template>
  <v-btn icon>
    <div @click="homePage" >
      <v-icon>mdi-account-circle</v-icon>
      <p>Home</p>
    </div>
  </v-btn>
</template>

<script>
export default {
  name: 'homeBtn',
  methods: {
    homePage() {
      this.$emit('toHome')
      this.$router.push({name: 'Home' })
    }
  }
}
</script>

<style>

</style>