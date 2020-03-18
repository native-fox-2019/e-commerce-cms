<template>
    <div id="app">
        <header>
            <h4>Toko Gunpla</h4>
            <nav>
                <ul class="nav_link">
                    <li>
                        <router-link to="/login">
                            <button class="btn" v-if="!this.$store.state.isLogin">Login</button>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/register">
                            <button class="btn" v-if="!this.$store.state.isLogin">Register</button>
                        </router-link>
                    </li>
                    <li>
                        <button
                            class="btn"
                            v-if="this.$store.state.isLogin"
                            v-on:click="logout"
                        >Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
        <router-view></router-view>
        <!-- <footer>
      <p>Copyright © 2020, Toko</p>
        </footer>-->
    </div>
</template>
<script>
export default {
    data: () => {
        return {};
    },
    methods: {
        logout: function() {
            localStorage.removeItem("access_token");
            this.$store.state.isLogin = false;
            this.$router.push({ name: "Login" });
        }
    }
};
</script>
