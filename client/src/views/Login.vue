<template>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <h1>Vue-Shoes</h1>
            </div>
            <div class="col-6">
                <div>
                    <b-form @submit.prevent="onSubmit">
                        <b-form-group id="email" label="Enter Your Email" label-for="email">
                            <b-form-input id="email" v-model="form.email" type="email" required></b-form-input>
                        </b-form-group>
                        <b-form-group id="password" label="Enter Your Password" label-for="password">
                            <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="primary">Submit</b-button>
                    </b-form>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
const axios=require('axios');

export default {
    data(){
        return {
            form:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        onSubmit(){
            
            var url=this.$store.state.SERVER+'/auth/login';
            axios.post(url,{
                email:this.form.email,
                password:this.form.password
            })
            .then((response)=>{
                //console.log(response);
                var token=response.data.token;
                localStorage.setItem('token',token);
                this.$store.state.isLogin=true;
                this.$router.push('/product');
            })
            .catch((err)=>{
                console.log('ada error',err);
            })
        }
    }
}
</script>