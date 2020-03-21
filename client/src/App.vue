<template>
  <div id="app">
      <navbar style="overflow: show;"></navbar>
    <router-view></router-view>
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
