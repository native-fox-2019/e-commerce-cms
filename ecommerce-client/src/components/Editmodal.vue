<template>
<div>
  <transition name="fade" appear>
    <div class="modal-overlay" v-if="$store.state.showModal"
    @click="$store.dispatch('toggleModalAct')"></div>
  </transition>
  <transition name="slide" appear>
    <div class="modal" v-if="$store.state.showModal">
      <h1> edit Data </h1>
      <!--  -->
      <form  v-on:submit.prevent="">
      <div class="containerForm"> <span class="textForm"> Product's Name </span> </div>
      <div class="containerForm">
          <input type="text" class="input inputText"
          placeholder="e.g. Batman new 52" v-model="$store.state.findResult.name">
      </div>
      <div class="containerForm"> <span class="textForm"> Image's Url </span> </div>
      <div class="containerForm">
          <input type="text" class="input inputText"
          v-model="$store.state.findResult.image_url"
          placeholder="e.g. www.someimage.com/image.jpg">
      </div>
      <div class="containerForm"> <span class="textForm" min=1> stock </span> </div>
      <div class="containerForm">
          <input type="number" class="input inputText" placeholder="1"
          v-model="$store.state.findResult.stock">
      </div>
      <div class="containerForm"> <span class="textForm"> Price </span> </div>
      <div class="containerForm">
          <input  class="input inputText" v-model="$store.state.findResult.price" />
      </div>
          <div class="containerForm">
              <input class="btn" type="submit" value="Add Comic">
              <button class="btn" @click="$store.dispatch('toggleModalAct')">Cancel</button>
          </div>
  </form>
      <!--  -->
    </div>
  </transition>
</div>
</template>
<script>
export default {
  methods: {
  },
};
</script>
