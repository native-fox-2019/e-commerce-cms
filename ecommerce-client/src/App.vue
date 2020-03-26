<template>
  <div id="app">
    <navbar></navbar>
    <div class="divCenter">
    </div>
    <router-view/>
  </div>
</template>
<script>
import navbar from './components/navbar.vue';

export default {
  components: {
    navbar,
  },
};
</script>
