<template>
  <div class="card">
    <img :src="product.image_url" style="width: 100%; heigth: auto; margin-bottom: 15px">
    <div class="card-name">
      <span>{{ product.name }}</span>
    </div>
    <div class="card-price">
      <span>Rp{{ product.price }}</span>
    </div>
    <div class="card-action" v-if="isLogin">
      <div class="btn-edit">
        <i class="fa fa-edit"></i>
      </div>
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
  props: ['product', 'isLogin', 'baseUrl'],
  data() {
    return {
      message: '',
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
              url: `${this.baseUrl}/products/${id}`,
              method: 'delete',
              headers: {
                token: localStorage.token,
              },
            };
            axios(options)
              .then((response) => {
                this.message = response.message;
                this.$emit('deleteProduct', id);
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
