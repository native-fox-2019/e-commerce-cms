<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <form class="login100-form validate-form p-l-55 p-r-55 p-t-178">
          <img src="../images/logo.png" class="login100-form-title"/>

          <div class="wrap-input100 validate-input m-b-16" style="margin-top:50px;">
            <input class="input100" type="text" name="email" placeholder="Email" />
            <span class="focus-input100"></span>
          </div>

          <div class="wrap-input100 validate-input">
            <input class="input100" type="password" name="pass" placeholder="Password" />
            <span class="focus-input100"></span>
          </div>

          <div class="container-login100-form-btn mt-5">
            <button class="login100-form-btn">Sign in</button>
          </div>

          <div class="flex-col-c p-t-65 p-b-40">
            <span class="txt1 p-b-9">Don’t have an account?</span>

            <a href class="txt3">Sign up now</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login"
};
</script>