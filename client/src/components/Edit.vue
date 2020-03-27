<template>
  <!--Naked Form-->
  <div class="container mt-5" style="width: 50%">
<div class="card-block">

    <!--Header-->
    <div class="text-center">
        <h3><i class="far fa-edit mr-2"></i>Edit Data</h3>
        <hr class="mt-2 mb-2">
    </div>

    <!--Body-->
    <div class="md-form text-left">
        <input type="text" id="form3" class="form-control" v-model="editProduct.name">
    </div>

    <div class="md-form text-left">
        <input type="text" id="form2" class="form-control" v-model="editProduct.category">
    </div>

    <div class="md-form text-left">
        <input type="text" id="form32" class="form-control" v-model="editProduct.description">
    </div>

     <div class="md-form text-left">
        <input type="text" id="form32" class="form-control" v-model="editProduct.price">
    </div>

 <div class="md-form text-left">
        <input type="text" id="form32" class="form-control" v-model="editProduct.stock">
    </div>

 <div class="md-form text-left">
        <input type="text" id="form32" class="form-control" v-model="editProduct.image_url">
    </div>

    <div class="text-center">
        <button class="btn btn-danger" @click="cencelEdit">Cencel</button>
    </div>
    <div class="text-center">
        <button class="btn btn-default" @click="editData(editProduct)">Submit</button>
    </div>
</div>
</div>
<!--Naked Form-->
</template>

<script>
import Vue from 'vue'
export default Vue.extend ({
    name : 'Edit',
    data() {
        return {
            newEdit : {}
            }
    },
    computed : {
        editProduct() {
            return this.$store.state.editProduct
        }
    },

    methods : {
        editData(data) {
           this.$store.dispatch('editData', data)
           this.$router.push({path : '/'})

        },
        cencelEdit() {
            this.$router.push({path : '/'})
        }
    }

})
</script>

<style>

</style>