<template>
  <div class="d-flex justify-content-center align-items-center forms">
    <div>
      <b-form @submit="onSubmit">
        <b-form-group label="Email address:" label-for="email">
          <b-form-input v-model="form.email" type="email" required placeholder="Enter email">
          </b-form-input>
        </b-form-group>

        <b-form-group
          label="Password"
          label-for="password"
        >
        <b-form-input type="password" v-model="form.password" required placeholder="Enter password">
        </b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
    },
  },
};
</script>
