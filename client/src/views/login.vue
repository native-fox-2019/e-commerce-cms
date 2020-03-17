<template>
<div class="container" style="max-width: 50%;">
  <h1>Login Your Account</h1>
  <LoginCard 
    @login="login"
  />
</div>
</template>

<script>
import LoginCard from '../components/loginCard.vue';
export default {
    components: {
        LoginCard
    },
    methods: {
      login(data) {
          console.log(data)
      }
    }
}
</script>