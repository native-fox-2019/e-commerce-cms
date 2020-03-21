<template>
  <div>
        <div class="divCenter"><span class="title"> Admin Register </span></div>
        <div class="divCenter" style="margin-top:1%">
            <div class="border" style="padding:20px">
            <form  v-on:submit.prevent="registerDispatch(register)">

                <div class="containerForm"> <span class="textForm"> Name </span> </div>
                <div class="containerForm">
                    <input class="input inputText" type="text" placeholder="e.g. Johny Koplo"
                    v-model="register.name">
                </div>

                <div class="containerForm"> <span class="textForm"> Email </span> </div>
                <div class="containerForm">
                    <input class="input inputText" type="email" placeholder="email"
                    v-model="register.email">
                </div>

                <div class="containerForm"> <span class="textForm"> Password </span> </div>
                <div class="containerForm">
                    <input class="input inputText" type="password" placeholder="supersecure123"
                    v-model="register.password">
                </div>

                    <div class="containerForm">
                        <input type="submit" value="Login">
                    </div>
            </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      register: {
        name: '',
        email: '',
        password: '',
        level: 'admin',
      },
    };
  },
  methods: {
    registerDispatch(obj) {
      this.$store.dispatch('register', obj);
    },
  },
};
</script>
