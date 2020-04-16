<template>
    <nav class="navbar navbar-light shadow mb-3">
    <a class="navbar-brand">Dashboard</a>
    <form class="form-inline">
        <b-button variant="outline-primary" class="m-2 my-sm-0"  @click.prevent="gotoRegPage()">😃</b-button>
        <b-button variant="outline-success" class="m-2 my-sm-0" @click.prevent="triggerAddForm()" v-b-modal.ProductFormModal>&#10010;</b-button>
        <b-button variant="outline-danger" class="m-2 my-sm-0" @click.prevent="logout()">⇱</b-button>
    </form>
    </nav>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


export default {
    name: 'Navbar',
    methods: {
        ...mapActions(['productFormReset']),
        triggerAddForm() {
            this.productFormReset()
        },
        logout() {
            Swal.fire({
                title: 'Log Out?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                })
                .then((result) => {
                if (result.value) {
                    delete localStorage.access_token
                    this.$store.state.productList = []
                    this.$router.push({
                        path: '/login'
                    })
                    Toast.fire({
                        icon: 'success',
                        title: 'Logout Success!'
                    })
                }
            })
        },
        gotoRegPage() {
            this.$router.push({
                path: '/register'
            })
        }
    }
}
</script>