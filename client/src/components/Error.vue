<template>
  <div>
    {{ displayError }}
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: ['errors'],
  computed: {
    displayError() {
      let message = '';
      if (Array.isArray(this.errors)) {
        this.errors.forEach((err) => {
          message += `${err}, `;
        });
      } else {
        message = this.errors;
      }
      return message;
    },
  },
};
</script>

<style>

</style>
