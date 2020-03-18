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
                <template v-slot:row-details="row">
                    <b-card>
                        <b-row>
                            <b-col sm="2"><span class="bold">Product Name:</span></b-col>
                            <b-col class="text-sm-left"> {{row.item.product}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="2"><span class="bold">Product Price:</span></b-col>
                            <b-col class="text-sm-left">{{row.item.price}}</b-col>
                        </b-row>
                    </b-card>
                </template>
            </b-table>
           
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            fields:[
                {
                    key:'id',
                    sortable:true
                },
                {
                    key:'product',
                    sortable:true
                },
                {
                    key:'price',
                    sortable:true
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
    methods:{
        confirmDelete(id){
            // var self=this;
            this.$bvModal.msgBoxConfirm(`Are you sure want to delete product with id ${id}?`)
            .then((result)=>{
                if(result){
                    this.$store.commit('deleteProduct',id);
                }
            })
            .catch(()=>{
                this.$bvModal.msgBoxOk('An error occured');
            })
        }
    }
}
</script>
<style scoped>
    .bold{
        font-weight: bold;
    }
</style>