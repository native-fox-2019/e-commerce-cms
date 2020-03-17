<template>
  <div id="app">
    <div class="header">
      <div class="header-content">
        <div class="title">
          <span>E-Commerce</span>
        </div>
        <div class="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/login">Sign In</router-link>
          <router-link to="/register">Register</router-link>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>
