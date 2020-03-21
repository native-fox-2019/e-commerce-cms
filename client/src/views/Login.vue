<template>
    <div class="login-page user-access">
        <div>
            <h4 class="login-title">Login</h4>
        </div>
        <form v-on:submit.prevent="login" class="login-form">
            <div class="textbox">
                <input
                    type="email"
                    id="login-email"
                    placeholder="Email Address"
                    v-model="login_email"
                />
            </div>
            <div class="textbox">
                <input
                    type="password"
                    id="login-email"
                    placeholder="Password"
                    v-model="login_password"
                />
            </div>
            <button type="submit" class="btn login-btn">Sign In</button>
        </form>
        <div class="action-button">
            <router-link to="/register">
                <span>Click Here to Register</span>
            </router-link>
            <!-- <router-link to="/">
                <span>Click Here to Sign In with Google</span>
            </router-link>-->
        </div>
    </div>
</template>
<script>
import Axios from "axios";

export default {
    name: "Login",
    data: () => {
        return {
            login_email: "",
            login_password: ""
        };
    },
    methods: {
        login: function() {
            Axios({
                method: "post",
                url: `${this.$store.state.rootUrl}/user/login`,
                data: {
                    email: this.login_email,
                    password: this.login_password
                }
            })
                .then(result => {
                    console.log(result.data.access_token);
                    localStorage.setItem(
                        "access_token",
                        result.data.access_token
                    );
                    this.login_email = "";
                    this.login_password = "";
                    this.$store.state.isLogin = true;
                    this.$router.push({ name: "Product" });
                })
                .catch(err => {
                    console.log(err.response);
                    this.$store.dispatch("errorHandler", err.response);
                });
        }
    }
};
</script>
