<template>
    <b-card>
         <b-form-file
        v-model="file"
        placeholder="Choose your banner"
        ></b-form-file>
        <button class="btn btn-success mt-3" :disabled="isUploading">Upload Banner</button>
    </b-card>
</template>

<script>
export default {
    data(){
        return {
            isUploading:false,
            file:null
        }
    }
}
</script>