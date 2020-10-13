<template>
    <div>
        <nav class="navbar-expand-lg navbar-light"
        style="background-color: #21B6A8; margin-bottom: 2em;">
            <div id="logo">
              <router-link to="/">
                <img src="http://getdrawings.com/free-icon/icon-lamp-67.png" alt="logo">
                <a>Kurikula</a>
              </router-link>
            </div>
            <div
            class="navbar-collapse"
            style="padding: 1em 2em;">
              <ul class="navbar-nav">
                <li class="nav-item" v-if="!isLogin">
                    <router-link
                      to="/register"
                      class="nav-link">
                      Register
                    </router-link>
                </li>
                <li class="nav-item" v-if="!isLogin">
                    <router-link
                      to="/login"
                      class="nav-link">
                      Log In
                    </router-link>
                </li>
                <li class="nav-item" v-if="isAdmin">
                    <router-link
                      to="/add-item"
                      class="nav-link">
                      Add Item
                    </router-link>
                </li>
                <li class="nav-item" v-if="isLogin">
                    <router-link
                      to="/user"
                      class="nav-link">
                      Profile
                    </router-link>
                </li>
                <li
                  v-if="isLogin"
                  class="nav-item">
                    <div @click.prevent="logout" class="nav-link">Log Out</div>
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
* {
  margin: 0;
  list-style-type: none;
}

a {
  text-decoration: none;
}

#logo {
  display: block;
  margin: auto;
  text-align: center;
}

#logo img {
  width: 2em;
}

.navbar-collapse {
  display: flex;
  justify-content: center;
  text-align: center;
}

#logo a {
  color: white;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 1.4rem;
  font-weight: 700;
  padding: 1em;
}

.nav-item {
  padding: 0em 0.5em;
  margin: 0em 1em;
  border-radius: 0.5em;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 1.2rem;
}

.nav-link {
  color: white;
  width:100%;
}

.nav-item:hover {
  cursor: pointer;
  background: #177F75;
  transition: 0.2s;
}

@media (min-width: 930px) {
  nav {
    display: flex;
    justify-content: space-around;
  }

  #logo {
    display: flex;
    align-items: center;
    margin-left: 1em;
  }

  #logo a {
    padding: 1em;
  }

  .nav-item {
  padding: 0em 0.5em;
  margin: 0em 1em;
  border-radius: 0.5em;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 1.2rem;
  }

  .nav-link {
    color: white;
  }

  .nav-item:hover {
    cursor: pointer;
    background: #177F75;
    transition: 0.2s;
  }

  .navbar-collapse {
    display: flex;
    justify-content: flex-end;
  }

  .nav-link {
  color: white;
  margin: auto;
}
}
</style>
