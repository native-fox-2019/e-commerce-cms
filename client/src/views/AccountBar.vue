<template>
  <div class="row" v-if="isLoggedIn === true">
    <!-- Profile Info and Notifications -->
    <div class="col-md-6 col-sm-8 clearfix">
    </div>

    <!-- Raw Links -->
    <div class="col-md-6 col-sm-4 clearfix hidden-xs">
      <ul class="list-inline links-list pull-right">
        <li>
          <a v-on:click="logout">
            Log Out
            <i class="entypo-logout right"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountBar',
  computed: {
    isLoggedIn() {
      return !!this.$store.state.jwt;
    },
  },
  methods: {
    logout() {
      this.$store.commit('deleteJwt');
      this.$router.push('/login');
    }
  }
};
</script>
