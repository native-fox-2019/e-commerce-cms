<template>
    <div class="d-flex flex-row bd-highlight mb-3 justify-content-between bg-dark">
        <div class="m-1 flex-grow-1 text-center">
            <h1 class="text-light">Oldie Music</h1>
        </div>
        <div class="p-2 m-1 bd-highlight">
            <button @click="logout" class="btn btn-danger">Logout</button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        logout(){
            localStorage.removeItem('token');
            this.$router.push({
                path: '/login'
            })
        }
    }
}
</script>