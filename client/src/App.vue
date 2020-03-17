<template>
  <div>
    <login v-if="!isLogin"/>
  </div>
</template>

<script>
import Login from './views/login.vue';

export default {
  components: {
    Login,
  },
  data() {
    return {
      isLogin: false,
    };
  },
};
</script>
