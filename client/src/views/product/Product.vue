<template>
    <div>
        <div class="row">
            <router-link to="/product/create">
                <button class="btn btn-success mb-3">Create Product</button>
            </router-link> 
        </div>
        <div class="row">
            <b-table stripped hover :items="items"></b-table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            items:[
                {id:1,product:'Nike',price:'10000'}
            ]
        }
    }
}
</script>