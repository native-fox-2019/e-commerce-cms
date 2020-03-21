<template>
    <div id="app">
        <header>
            <router-link to="/" style="text-decoration: none;">
                <h4>Toko Gunpla: CMS</h4>
            </router-link>
            <ul class="middle-nav">
                <li>
                    <router-link to="/">
                        <span v-if="this.$store.state.isLogin">See Product</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/users">
                        <span
                            v-if="
                                this.$store.state.isLogin &&
                                    this.$store.state.user_info.superUser
                            "
                        >See Users</span>
                    </router-link>
                </li>
            </ul>
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
        <div class="footer">
            <div class="footer-content">
                <p>Super User Contact:</p>
                <p>email: rqz.agastya@gmail.com</p>
            </div>
            <div class="footer-bottom">&copy; Toko Gunpla | by Gusti Agung A T</div>
        </div>
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
