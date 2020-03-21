<template>
    <div>
        <b-row>
            <router-link to="/banner/add">
                <button class="btn btn-success mb-3">Add Banner</button>
            </router-link>
        </b-row>
        <b-card v-for="(banner,index) in banners" :key="index">
            <b-row>
                <b-col sm="8">
                    <img :src="$store.state.SERVER+'/banner/'+banner.name" class="banner-img" alt="">
                </b-col>
                <b-col sm="2">
                    <button class="btn btn-danger">Delete</button>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>
<script>
export default {
    data(){
       return {}
    },
    computed:{
        banners(){
            return this.$store.state.banners;
        } 
    },
    created(){
        this.$store.dispatch('loadBanner');
    }
}
</script>
<style scoped>
    .banner-img{
        height:200px;
        width: 100%;
    }
</style>