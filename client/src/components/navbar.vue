<template>
  <div class="navbar-list">
    <button @click.prevent="signout" class="signOut">sign out</button>
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
.navbar-list {
  width: 97.8vw;
  z-index: 1;
  top: 0;
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  align-content: center;
  background-color: #6D435A;
  border: 3px #6D435A solid;
  padding: 7px;
  height: 10vh;
}
.signOut {
  margin-right: 1vw;
  background-color: #B1EDE8;
  cursor: pointer;
  border: 2px #FF6978 solid;
  border-radius: 7px;
}
.signout:hover {
  transform: scale(1.08);

}
</style>
