<template>
  <div class="navbar">
    <button @click.prevent="signout" class="signout">sign out</button>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    signout () {
      localStorage.removeItem('access_token')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
<style>
.navbar {
  position: fixed;
  width: 100%;
  z-index: 1;
  top: 0;
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  align-content: center;
  background-color: #340068;
  border: 3px #340068 solid;
  padding: 7px;
  height: 10vh;
}
.signout {
  margin-right: 1vw;
  background-color: #B1EDE8;
  border: 2px #FF6978 solid;
  border-radius: 7px;
}
</style>
