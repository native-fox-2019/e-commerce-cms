<template>
    <div>
        <img alt="logo" src="../assets/guitar.png" style="width: 15%; margin-top: 5%">
        <h1>
            Oldie Music Admin Page
        </h1>
        <h3 class="mt-3">Login (Admin)</h3>
        <div class="container">
            <div class="d-flex justify-content-center">
                <div class="card bg-dark" style="width: 18rem; opacity: 75%;">
                    <div class="card-body">
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label class="text-light">Email address</label>
                                <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                            </div>
                            <div class="form-group">
                                <label class="text-light">Password</label>
                                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
                            </div>
                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data(){
        return{
            email : null,
            password : null,
            endpoint : 'http://localhost:3000',
        }
    },
    methods: {
        login(){
            axios({
                method : 'post',
                url : `${this.endpoint}/users/adminLogin`,
                data : {
                    email : this.email,
                    password : this.password
                }
            })
                .then(res=>{
                    localStorage.setItem('token', res.data.access_token);
                    this.$router.push({
                        path: '/'
                    })
                })
                .catch(err=>{
                    Swal.fire({
                        icon : 'error',
                        title : `Error`,
                        text : `${err.response.data.message}`,
                        confirmButtonText : 'Close'
                    })
                })
        }
    }
}
</script>