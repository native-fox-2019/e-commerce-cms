<template>
  <div class="header">
  <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu">
  <label for="openSidebarMenu" class="sidebarIconToggle">
    <div class="spinner diagonal part-1"></div>
    <div class="spinner horizontal"></div>
    <div class="spinner diagonal part-2"></div>
  </label>
  
  <div>
  

  </div>
  <div id="sidebarMenu">
    <ul class="sidebarMenuInner container text-center" style="margin-top: -2em;">
      <li> <i style="font-size: 10em;" class="fab fa-aviato"></i><span style="color:#fff;margin-bottom: -1em; margin-top:-2em">rase for the sky cause tommoro will never come</span></li>
      <li style="color: black"><a href>Category</a></li>
      <li style="color: black"><a href>Add Product</a></li>
      <li style="color: black"><a href>Add Staff</a></li>
      <li><button type="button" class="btn btn-danger" style="border-radius: 50px" @click="logout">LOGOUT</button></li>
    </ul>
    
  </div>
  <div class="container-fluid">
  <form class="form-inline float-right my-2 h-1">
    <input style="border-radius:40px;" class="form-control mr-sm-2" type="search" placeholder="Search by Category" aria-label="Search">
    <button style="line-height: 0.5; border-radius:40px" class="btn btn-outline-info my-sm-0" type="submit">Search</button>
  </form>
  </div>
  </div>

</template>

<script>
import Vue from 'vue'
import Swal from 'sweetalert2'
export default Vue.extend({
    name : 'Navbar',
    methods : {
        logout() {
            localStorage.removeItem('token')
            this.$router.push({path : '/login'})
            Swal.fire({
            position: "center",
            icon: "success",
            title: "Logging Out!",
            showConfirmButton: false,
            timer: 1500
          });
        }
    }

})
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Varela+Round');
html, body {
    overflow-x: hidden;
    height: 100%;
}
body {
    background: #fff;
    padding: 0;
    margin: 0;
    font-family: 'Varela Round', sans-serif;
}
.header {
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
    box-shadow: none;
    background: rgb(2,0,36);
    background: linear-gradient(260deg, rgba(2,0,36,0.3) 0%, rgba(186,52,146,0.06904760195093662) 35%, rgba(0,212,255,1) 100%); 
    position: fixed;
    height: 60px!important;
    overflow: hidden;
    z-index: 10;
    -webkit-box-shadow: 0px 8px 14px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 8px 14px -6px rgba(0,0,0,0.75);
    box-shadow: 0px 8px 14px -6px rgba(0,0,0,0.75);
}
.main {
    margin: 0 auto;
    display: block;
    height: 100%;
    margin-top: 60px;
}
.mainInner{
    display: table;
    height: 100%;
    width: 100%;
    text-align: center;
}
.mainInner div{
    display:table-cell;
    vertical-align: middle;
    font-size: 3em;
    font-weight: bold;
    letter-spacing: 1.25px;
}
#sidebarMenu {
    height: 100%;
    position: fixed;
    left: 0;
    width: 250px;
    margin-top: 60px;
    transform: translateX(-250px);
    transition: transform 250ms ease-in-out;
    background: rgba(2,0,36,0.4);
    background: linear-gradient(77deg, rgba(2,0,36,1) 0%, rgba(186,52,146,0.06904760195093662) 35%, rgba(0,212,255,1) 100%); 
    -webxkit-box-shadow: 10px -3px 7px -6px rgba(0,0,0,0.75);
-moz-box-shadow: 10px -3px 7px -6px rgba(0,0,0,0.75);
box-shadow: 10px -3px 7px -6px rgba(0,0,0,0.75);
}
.sidebarMenuInner{
    margin:0;
    padding:0;
    border-top: 1px solid rgba(255, 255, 255, 0.10);
}
.sidebarMenuInner li{
    list-style: none;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    padding: 20px;
    cursor: pointer;
    border-bottom: 1px solid rgba(2,0,36,0.2);
}
.sidebarMenuInner li span{
    display: block;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.50);
}
.sidebarMenuInner li a{
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
}
input[type="checkbox"]:checked ~ #sidebarMenu {
    transform: translateX(0);
}

input[type=checkbox] {
    transition: all 0.3s;
    box-sizing: border-box;
    display: none;
}
.sidebarIconToggle {
    transition: all 0.3s;
    box-sizing: border-box;
    cursor: pointer;
    position: absolute;
    z-index: 99;
    height: 100%;
    width: 100%;
    top: 22px;
    left: 15px;
    height: 22px;
    width: 22px;
}
.spinner {
    transition: all 0.3s;
    box-sizing: border-box;
    position: absolute;
    height: 3px;
    width: 100%;
    background-color: #fff;
}
.horizontal {
    transition: all 0.3s;
    box-sizing: border-box;
    position: relative;
    float: left;
    margin-top: 3px;
}
.diagonal.part-1 {
    position: relative;
    transition: all 0.3s;
    box-sizing: border-box;
    float: left;
}
.diagonal.part-2 {
    transition: all 0.3s;
    box-sizing: border-box;
    position: relative;
    float: left;
    margin-top: 3px;
}
input[type=checkbox]:checked ~ .sidebarIconToggle > .horizontal {
    transition: all 0.3s;
    box-sizing: border-box;
    opacity: 0;
}
input[type=checkbox]:checked ~ .sidebarIconToggle > .diagonal.part-1 {
    transition: all 0.3s;
    box-sizing: border-box;
    transform: rotate(135deg);
    margin-top: 8px;
}
input[type=checkbox]:checked ~ .sidebarIconToggle > .diagonal.part-2 {
    transition: all 0.3s;
    box-sizing: border-box;
    transform: rotate(-135deg);
    margin-top: -9px;
}
</style>