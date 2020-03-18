<template>
  <div class="card">
    <img :src="product.image_url" style="margin-bottom: 15px" width="100%" height="55%">
    <router-link :to="link">
    <div class="card-name">
      <span>{{ product.name }}</span>
    </div>
    </router-link>
    <div class="card-price">
      <span>Rp{{ product.price }}</span>
    </div>
    <div class="card-action" v-if="$store.state.isLogin">
      <div class="btn-delete">
        <i class="fa fa-trash" @click="deleteProductCard(product.id)"></i>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import swal from 'sweetalert';

export default {
  props: ['product'],
  data() {
    return {
      message: '',
      link: {
        name: 'Product',
        params: { id: this.product.id },
        data: this.product.id,
      },
    };
  },
  methods: {
    deleteProductCard(id) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this Product!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            const options = {
              url: `${this.$store.state.baseUrl}/products/${id}`,
              method: 'delete',
              headers: {
                token: localStorage.token,
              },
            };
            axios(options)
              .then((response) => {
                this.message = response.message;
                this.$store.commit('deleteProduct', id);
                swal('Poof! Your product has been deleted!', {
                  icon: 'success',
                });
              })
              .catch((err) => {
                console.log(err.response);
              });
          } else {
            swal('Your product is safe!');
          }
        });
    },
  },
};
</script>
