<template>
  <div>
    <h1>DISINI PRODUCT PAGE</h1>
    <button class="btn btn-danger" @click="doLogOut">Logout</button>
  </div>
</template>
<script>
export default {
    methods: {
        doLogOut () {
            localStorage.removeItem('access_token')
            this.$router.push({ name: 'Login' })
        }
    }
};
</script>
