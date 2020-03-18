<template>
  <div class="header">
    <h1>LOGO</h1>
    <nav>
      <ul class="nav_links">
        <router-link to="/">
          <li><a>Home</a></li>
        </router-link>
        <router-link to="/register">
          <li><a>Register</a></li>
        </router-link>
        <router-link to="/products">
          <li><a>Products</a></li>
        </router-link>
      </ul>
    </nav>
    <a @click.prevent="logout" class="cta" href=""><button>Logout</button></a>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout() {
      localStorage.removeItem('access_token');
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background-color: #24252A;
  }

  li, a, button {
    font-weight: 500;
    font-size: 16px;
    color: #edf0f1;
    text-decoration: none;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10%;
    padding-left: 350px;
  }

  h1 {
    cursor: pointer;
    color: #edf0f1;
  }

  .nav_links {
    list-style: none;
  }

  .nav_links li {
    display: inline-block;
    padding: 0px 20px;
  }

  .nav_links li a {
    transition: all 0.3s ease 0s;
  }

  .nav_links li a:hover {
    color: #0088a9;
  }

  button {
    padding: 9px 25px;
    background-color: rgba(0, 136, 169, 1);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }

  button:hover {
    background-color: rgba(0, 136, 169, 0.8);
  }
</style>
