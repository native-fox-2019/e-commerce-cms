<template>
    <div class="login-page user-access">
        <div>
            <h4 class="login-title">Sign In</h4>
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
            <span>Click Here to Register</span>
            <span>Click Here to Sign In with Google</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data: () => {
        return {
            login_email: '',
            login_password: ''
        }
    },
    methods: {
        login: function() {
            console.log(this.login_email, this.login_password)
        }
    }
}
</script>
