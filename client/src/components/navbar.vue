<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div>
      <button class="btn btn-warning m-1" @click="logout">Log Out</button>
      <button class="btn btn-success m-1" @click="addProduct">Add Product</button>
    </div>
  </nav>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  methods: {
    logout() {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Signed out successfully',
      });
      localStorage.removeItem('token');
      this.$router.push({ path: '/login' });
      this.$store.dispatch('logout');
    },
    addProduct() {
      this.$router.push({ path: '/addproduct' });
    },
  },
};
</script>
