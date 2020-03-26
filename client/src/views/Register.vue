<template>
  <div class="wrap d-flex justify-content-center align-items-center">
    <div class="middle">
      <b-container class="">
        <b-card class="rounded">
          <b-card-header
            class="text-center"
            style="background-color: #43c4ab; position: relative; margin-top: -60px; border-radius: 20px"
            ><h3>Register</h3></b-card-header
          >
          <b-card-body>
            <b-form @submit="onSubmit">
              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Your Name:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.name"
                  required
                  placeholder="Enter name"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Password:"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="form.password"
                  type="password"
                  required
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
            <div class="d-flex justify-content-end">
              <router-link to="/login">
                <small class="text-right"> Have account click here</small>
              </router-link>
            </div>
          </b-card-body>
        </b-card>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: ""
      }
    };
  }
};
</script>

<style>
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #43c6ac; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #191654,
    #43c6ac
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #191654,
    #43c6ac
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
