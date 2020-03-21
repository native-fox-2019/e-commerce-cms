<template>
  <div class="sidebar-menu">
    <div class="sidebar-menu-inner">
      <header class="logo-env">
        <!-- logo -->
        <div class="logo">
          <router-link to="">
            <img src="assets/logo.png" width="30" alt />
          </router-link>
        </div>

        <!-- logo collapse icon -->
        <div class="sidebar-collapse">
          <a href="#" class="sidebar-collapse-icon">
            <!-- add class "with-animation" if you want sidebar to have animation
            during expanding/collapsing transition -->
            <i class="entypo-menu"></i>
          </a>
        </div>

        <!-- open/close menu icon (do not remove if you want to enable menu on mobile devices) -->
        <div class="sidebar-mobile-menu visible-xs">
          <a href="#" class="with-animation">
            <!-- add class "with-animation" to support animation -->
            <i class="entypo-menu"></i>
          </a>
        </div>
      </header>

      <ul id="main-menu" v-if="isLoggedIn === true" class="main-menu">
        <!-- add class "multiple-expanded" to allow multiple submenus to open -->
        <!-- class "auto-inherit-active-class" will automatically add "active"
        class for parent elements who are marked already with class "active" -->
        <li class="active opened active has-sub">
          <a href="#">
            <i class="entypo-layout"></i>
            <span class="title">Products</span>
          </a>
          <ul class="visible">
            <li>
              <router-link to="products">
                <span class="title">Product List</span>
              </router-link>
            </li>
            <li>
              <router-link to="add-product">
                <span class="title">Add Product</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
      <ul id="main-menu" v-else class="main-menu">
        <!-- add class "multiple-expanded" to allow multiple submenus to open -->
        <!-- class "auto-inherit-active-class" will automatically add "active"
        class for parent elements who are marked already with class "active" -->
        <li class="active opened active has-sub">
          <a href="#">
            <i class="entypo-layout"></i>
            <span class="title">Account</span>
          </a>
          <ul class="visible">
            <li>
              <router-link to="login">
                <span class="title">Login</span>
              </router-link>
            </li>
            <li>
              <router-link to="register">
                <span class="title">Register</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarMenu',
  props: ['isLoggedIn'],
};
</script>
