<template>
    <div id="app">
        <header>
            <h4>TokoPedofil</h4>
            <nav>
                <ul class="nav_link">
                    <li>
                        <router-link to="/login"
                            ><button class="btn" v-if="!isLogin">
                                Login
                            </button></router-link
                        >
                    </li>
                    <li>
                        <router-link to="/register"
                            ><button class="btn" v-if="!isLogin">
                                Register
                            </button></router-link
                        >
                    </li>
                    <li>
                        <button class="btn" v-if="isLogin" v-on:click="logout">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data: () => {
        return {
            isLogin: localStorage.getItem('access_token')
        }
    },
    methods: {
        logout: function() {
            localStorage.removeItem('access_token')
            this.isLogin = false
            console.log(this.isLogin)
        }
    }
}
</script>
