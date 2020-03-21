<template>
    <nav class="navbar navbar-light shadow mb-3">
    <a class="navbar-brand">Dashboard</a>
    <form class="form-inline">
        <b-button variant="outline-primary" class="m-2 my-sm-0"  @click.prevent="register()">😃</b-button>
        <b-button variant="outline-success" class="m-2 my-sm-0" @click.prevent="triggerAddForm()" v-b-modal.ProductFormModal>&#10010;</b-button>
        <b-button variant="outline-danger" class="m-2 my-sm-0" @click.prevent="logout()">⇱</b-button>
    </form>
    </nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Navbar',
    methods: {
        ...mapActions(['productFormReset']),
        triggerAddForm() {
            this.productFormReset()
        },
        logout() {
            delete localStorage.access_token
            this.$store.state.productList = []
            this.$router.push({
                path: '/login'
            })
        }
    }
}
</script>