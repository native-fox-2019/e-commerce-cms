<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #21d192;">
            <router-link to="/">
                <img src="http://getdrawings.com/free-icon/icon-lamp-67.png" width="50" height="50" alt="">
            </router-link>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link
                      to="/register"
                      v-if="!isLogin"
                      class="nav-link">
                      Register
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link
                      to="/login"
                      v-if="!isLogin"
                      class="nav-link">
                      Log In
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link
                      to="/add-item"
                      v-if="isAdmin"
                      class="nav-link">
                      Add Item
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link
                      to="/user"
                      v-if="isLogin"
                      class="nav-link">
                      Profile
                    </router-link>
                </li>
                <li
                  v-if="isLogin"
                  class="nav-item">
                    <button @click.prevent="logout" class="nav-link">Log Out</button>
                </li>
                <!-- <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle"
                    href="#" id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    Dropdown link
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li> -->
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
// import router from '../router';

export default {
  name: 'Navbar',
  created() {
    if (localStorage.getItem('token')) {
      this.$store.commit('changeIsLogin', true);
    } else {
      this.$store.commit('changeIsLogin', false);
    }

    if (localStorage.getItem('userProfile') === 'admin') {
      this.$store.commit('changeSpecialRole', 'admin');
    } else if (localStorage.getItem('userProfile') === 'customer') {
      this.$store.commit('changeSpecialRole', 'customer');
    }
  },
  methods: {
    logout() {
      this.$swal.fire({
        icon: 'warning',
        title: 'You sure you want to log out?',
        text: 'We will miss you!',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Log Out',
      })
        .then((answer) => {
          // console.log('Answer:', answer);
          if (answer.value) {
            localStorage.removeItem('token');
            localStorage.removeItem('userProfile');
            // delete appAxios.defaults.headers.token;
            this.$store.commit('changeToken', '');
            this.$store.commit('changeUserProfile', '');
            this.$store.commit('changeSpecialRole', '');
            this.$store.commit('changeIsLogin', false);
            console.log('Log out successful!');
            this.$router.push('/login');
          }
        })
        .catch(() => {
        });
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    isAdmin() {
      if (this.$store.state.specialRole === 'admin') return true;
      return false;
    },
    isCustomer() {
      if (this.$store.state.specialRole === 'customer') return true;
      return false;
    },
  },
};
</script>

<style scoped>

</style>
