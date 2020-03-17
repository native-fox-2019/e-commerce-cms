<template>
    <div class="register-page user-access">
        <div>
            <h4 class="register-title">Register</h4>
        </div>
        <form v-on:submit.prevent="register" class="register-form">
            <div class="textbox">
                <input
                    type="text"
                    id="register-name"
                    placeholder="Name"
                    v-model="register_name"
                />
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
                    id="register-email"
                    placeholder="Password"
                    v-model="register_password"
                />
            </div>
            <button type="submit" class="btn register-btn">Sign Up</button>
        </form>
        <div class="action-button">
            <span>Click Here to Login</span>
            <span>Click Here to Sign In with Google</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Register',
    data: () => {
        return {
            register_name: '',
            register_email: '',
            register_password: ''
        }
    },
    methods: {
        register: function() {
            console.log(this.register_email, this.register_password)
        }
    }
}
</script>
