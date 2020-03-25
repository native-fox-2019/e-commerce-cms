<template>
    <div class="register-page user-access">
        <div>
            <h4 class="register-title">Register</h4>
        </div>
        <form v-on:submit.prevent="register" class="register-form">
            <div class="textbox">
                <input type="text" id="register-name" placeholder="Name" v-model="register_name" />
            </div>
            <div class="textbox">
                <input
                    type="email"
                    id="register-email"
                    placeholder="Email Address"
                    v-model="register_email"
                />
            </div>
            <div class="textbox">
                <input
                    type="password"
                    id="register-password"
                    placeholder="Password"
                    v-model="register_password"
                />
            </div>
            <div class="textbox">
                <input
                    type="password"
                    id="register-password"
                    placeholder="Confirm Password"
                    v-model="register_password_confirm"
                />
            </div>
            <button type="submit" class="btn register-btn">Sign Up</button>
        </form>
        <div class="action-button">
            <router-link to="/login">
                <span>Click Here to Login</span>
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
    name: "Register",
    data: () => {
        return {
            register_name: "",
            register_email: "",
            register_password: "",
            register_password_confirm: ""
        };
    },
    methods: {
        register: function() {
            if (this.register_password == this.register_password_confirm) {
                Axios({
                    method: "post",
                    url: `${this.$store.state.rootUrl}/user/registration`,
                    data: {
                        name: this.register_name,
                        email: this.register_email,
                        password: this.register_password
                    }
                })
                    .then(result => {
                        localStorage.setItem(
                            "access_token",
                            result.data.access_token
                        );
                        this.register_name = "";
                        this.register_email = "";
                        this.register_password = "";
                        this.register_password_confirm = "";
                        this.$store.state.isLogin = true;
                        this.$router.push({ name: "Product" });
                    })
                    .catch(err => {
                        this.$store.dispatch("errorHandler", err.response);
                    });
            } else {
                this.$store.dispatch("errorHandler", {
                    data: {
                        message: "Confirmation password doesn't match"
                    }
                });
            }
        }
    }
};
</script>
