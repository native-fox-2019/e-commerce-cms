<template>
    <div>
        <form @submit="submitForm">
            <div class="form-group">
                <label>Item Name</label>
                <input
                    type="text"
                    v-model="form.name"
                    class="form-control"
                    placeholder="Enter item name">
                <small class="form-text text-muted">Required.</small>
            </div>
            <div class="form-group">
                <label>Description</label>
                <input
                    type="text"
                    v-model="form.description"
                    class="form-control"
                    placeholder="Insert description here">
            </div>
            <input type="submit" class="btn btn-primary" value="Submit Item">
        </form>
    </div>

</template>

<script>
export default {
  data() {
    return {
      inputForm: {
        name: '',
        description: '',
        image_url: '',
        price: 0,
        count: 1,
      },
    };
  },
  methods: {
    submitForm() {
      this.$emit('pushItem', this.inputForm);
      this.resetForm();
    },
    resetForm() {
      this.inputForm.name = '';
      this.inputForm.description = '';
      this.inputForm.image_url = '';
      this.inputForm.price = 0;
      this.inputForm.count = 1;
    },
  },
};
</script>

<style>

</style>
