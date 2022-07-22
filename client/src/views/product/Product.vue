<template>
    <div>
        <div class="row">
            <router-link to="/product/create">
                <button class="btn btn-success mb-3">Create Product</button>
            </router-link> 
        </div>
        <div class="row">
            <b-table striped :items="items" :fields="fields">
                <template v-slot:cell(action)="row">
                   <router-link :to="'/product/edit/'+row.item.id"> <b-button variant="primary" class="mr-2">Edit</b-button> </router-link>
                    <b-button variant="secondary" @click="row.toggleDetails" class="mr-2">Detail</b-button>
                    <b-button variant="danger" @click="confirmDelete(row.item.id)">Delete</b-button>
                </template>
                <template v-slot:cell(price)="row">
                    {{convertToCurrency(row.item.price)}}
                </template>
                <template v-slot:row-details="row">
                    <b-card>
                        <b-row>
                            <b-col sm="6">
                                <b-row>
                                    <b-col sm="6"><span class="bold">Product Name:</span></b-col>
                                    <b-col class="text-sm-left" sm="6"> {{row.item.name}}</b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="6"><span class="bold">Product Price:</span></b-col>
                                    <b-col class="text-sm-left" sm="6">{{convertToCurrency(row.item.price)}}</b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="6"><span class="bold">Product Stock:</span></b-col>
                                    <b-col class="text-sm-left" sm="6">{{row.item.stock}}</b-col>
                                </b-row>
                                 <b-row>
                                    <b-col sm="6"><span class="bold">Product Category:</span></b-col>
                                    <b-col class="text-sm-left" sm="6">{{row.item.category}}</b-col>
                                </b-row>
                                 <b-row>
                                    <b-col sm="6"><span class="bold">Product Description:</span></b-col>
                                    <b-col class="text-sm-left" sm="6">{{row.item.description}}</b-col>
                                </b-row>
                            </b-col>
                            <b-col sm="6">
                                <img :src="imageURL(row.item)" class="product-img" alt="">
                            </b-col>

                        </b-row>

                    </b-card>
                </template>
            </b-table>
           
        </div>
    </div>
</template>
<script>
import numbro from 'numbro';

export default {
    data(){
        return{
            fields:[
                {
                    key:'id',
                    sortable:true,
                },
                {
                    key:'name',
                    sortable:true
                },
                {
                    key:'price',
                    sortable:true,
                },
                'action'
            ]
        }
    },
    computed:{
        items(){
            return this.$store.state.products;
        } 
    },
    created(){
        this.$store.dispatch('fetchProducts');
    },
    methods:{
        confirmDelete(id){
            // var self=this;
            this.$bvModal.msgBoxConfirm(`Are you sure want to delete product with id ${id}?`)
            .then((result)=>{
                if(result){
                    this.$store.dispatch('deleteProduct',id);
                }
            })
            .catch(()=>{
                this.$bvModal.msgBoxOk('An error occured');
            })
        },
        convertToCurrency(numStr){
            return numbro(numStr).format({thousandSeparated: true});
        },
        imageURL(product){
            if(product.isScrapped)
                return product.image_url
            return this.$store.state.SERVER+'/img/'+product.image_url
        }
    }
}
</script>
<style scoped>
    .bold{
        font-weight: bold;
    }

    .product-img{
        width: 200px;
        height: 100px;
    }
</style>