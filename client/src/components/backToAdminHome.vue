<template>
  <v-btn icon>
    <div @click="adminPage" >
      <v-icon>mdi-account-circle</v-icon>
      <p>Admin Page</p>
    </div>
  </v-btn>
</template>

<script>
export default {
  name: 'adminBtn',
  methods: {
    adminPage() {
      this.$emit('toAdmin')
      this.$router.push({path: '/admins' })
    }
  }
}
</script>

<style>

</style>