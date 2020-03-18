<script>
// @ is an alias to /src

export default {
  name: "Home",
  created(){
    let token=localStorage.getItem('token');
    if(!token){
      this.$router.push('/login');
    }
    else{
      this.$router.push('/product');
    }
  }
  
};
</script>
