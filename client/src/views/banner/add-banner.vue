<template>
    <b-card>
         <b-form-file
        v-model="banner"
        placeholder="Choose your banner"
        ></b-form-file>
        <button class="btn btn-success mt-3" @click="uploadBanner" :disabled="isUploading">Upload Banner</button>
    </b-card>
</template>

<script>
export default {
    data(){
        return {
            isUploading:false,
            banner:null
        }
    },
    methods:{
        uploadBanner(){
            //console.log(this.file);
            this.$store
            .dispatch('addBanner',{banner:this.banner})
            .then(()=>{
                this.$router.push('/banner');
            })
        }
    }
}
</script>