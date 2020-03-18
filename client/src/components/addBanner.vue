<template>
  <div class="container p-5 mt-5">
    <div id="addBanner">
      <form @submit.prevent="addNewBanner">
        <h2 class="text-center">Add Banners</h2>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Banner name"
            required="required"
            v-model="name"
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Banner Url"
            required="required"
            v-model="url"
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">
            Add new banner</button
          ><br />
          <button
            type="button"
            class="btn btn-danger mt-1"
            @click.prevent="changeAddBanFalse"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            name: null,
            url: null
        }
    },
    methods: {
        addNewBanner() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/products/banner',
                headers: {access_token:localStorage.access_token},
                data: {
                    name: this.name,
                    url: this.url
                }
            })
            .then(data => {
                console.log(data)
                this.$emit('doneAddBanner')
                Swal.fire({
                    icon:'success',
                    title: 'Added new banner'
                })
            })
            .catch(response => {
                console.log(response)
            })
        },
        changeAddBanFalse() {
            this.$emit('cancelAddBan')
        }
    }
};
</script>
