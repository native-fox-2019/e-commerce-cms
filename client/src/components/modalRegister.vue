<template>
    <b-modal
        id="modal-register"
        ref="modal"
        title="Create new admin"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
        >
        <form ref="form" @submit.stop.prevent="createAdmin">
          <b-form-group
          :state="regisState"
          label="Email"
          label-for="email-input"
          invalid-feedback="Email is required"
          >
              <b-form-input
                  id="email-input"
                  v-model="emailRegis"
                  :state="regisState"
                  required
              ></b-form-input>
          </b-form-group>

          <b-form-group
          :state="regisState"
          label="Password"
          label-for="password-input"
          invalid-feedback="Password is required"
          >
              <b-form-input
                  id="password-input"
                  type="password"
                  v-model="passwordRegis"
                  :state="regisState"
                  required
              ></b-form-input>
          </b-form-group>

          <b-form-group
          :state="regisState"
          label="Username"
          label-for="username-input"
          invalid-feedback="Username is required"
          >
              <b-form-input
                  id="username-input"
                  v-model="usernameRegis"
                  :state="regisState"
                  required
              ></b-form-input>
          </b-form-group>
        </form>
    </b-modal>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{
            endpoint : 'http://localhost:3000',
            regisState : null,
            emailRegis : null,
            passwordRegis : null,
            usernameRegis : null
        }
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.regisState = valid
            return valid
        },

        resetModal() {
            this.emailRegis = null;
            this.passwordRegis = null;
            this.usernameRegis = null;
            this.regisState = null;
        },

        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault()
        
            this.createAdmin()
        },

        createAdmin(){
            axios({
                method: 'post',
                url: `${this.endpoint}/users/adminRegister`,
                data: {
                    email: this.emailRegis,
                    password: this.passwordRegis,
                    username: this.usernameRegis
                }
            })
                .then(()=>{
                    this.$store.dispatch('getData');
                })
                .catch(err=>{
                    console.log(err)
                })
            
            this.$nextTick(() => {
                this.$bvModal.hide('modal-register')
            })
        }

    }
}
</script>