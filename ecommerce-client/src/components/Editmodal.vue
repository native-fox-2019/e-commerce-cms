<template>
<div>
  <transition name="fade" appear>
    <div class="modal-overlay" v-if="showModal" @click="showModal=false"></div>
  </transition>
  <transition name="slide" appear>
    <div class="modal" v-if="showModal">
      <h1> Lorem ispum</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Libero nam perferendis molestias laudantium quae eveniet ut
        totam aspernatur quod doloremque?</p>
    </div>
    <button class="button" @click="showModal=false">
      Close Modal
    </button>
  </transition>
</div>
</template>
