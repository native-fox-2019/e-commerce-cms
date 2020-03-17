<template>
    <div>
        <h1>Item List</h1>
        <div v-if="isLoadItem">Loading...</div>
        <ul v-else>
            <li v-for="item in itemsArr" :key="item.id">
                <ItemCard :item="currentItem"></ItemCard>
            </li>
        </ul>
        <div>
            <ItemCard v-if="currentItem" :item="currentItem"></ItemCard>
        </div>
    </div>
</template>

<script>
import axios from ('axios')
import ItemCard from '@/components/ItemCard.vue'
export default {
    name: 'Item',
    data: function() {
        return {
            itemsArr: [],
            isLoadItem: true,
            currentItem: null,
        }
    },
    components: {
        ItemCard,
    },
    methods: {
        getAllItems: function() {
            this.itemsArr = [
                {id: 1, name: 'Gun', description: 'pew pew'},
                {id: 2, name: 'Sword', description: 'real stabby'},
                {id: 3, name: 'Shield', description: 'real solid'}
            ]
            this.isLoadItem = false
            // axios({
            //     method: 'GET',
            //     url: `${base_url}/items`,
            //     headers: {
            //         token: localStorage.getItem('token')
            //     }
            // })
            // .then(result => {
            //     console.log(result)
            //     this.itemsArr = result
            //     this.isLoadItem = false
            // })
            // .catch(err => {
            //     console.log(err)
            // })
        },
        getOneItem: function(value) {
            this.currentItem = value 
        }
    },
    mounted: function() {
        this.getAllItems()
    }
}
</script>

<style>

</style>