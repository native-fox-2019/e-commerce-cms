<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="primary">
      <b-navbar-brand href="#" @click.prevent="dashboard()">
        <!-- <router-link to="/" class="nav-link"> -->
        <img src="../assets/img/logo.png" style="width: 3vw" />
        <span>Fox-Store</span>
        <!-- </router-link> -->
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{ $store.state.userName }}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="logout()">
              Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Nav",
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit("logout");
      this.$router.push({ name: "Login" });
    },
    dashboard() {
      this.$router.push({ name: "Dashboard" });
    }
  }
};
</script>

<style></style>
