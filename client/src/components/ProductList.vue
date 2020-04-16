<template>
    <b-table
        sticky-header
        responsive
        class="w-100"
        :fields="fields"
        :items="productListDesc"
    >
        <template v-slot:cell(image_url)="data">
            <img :src="data.value" class="img-thumbnail">
            <b-form-textarea
                class="form-control mt-2 ml-2 mx-auto"
                style="width:240px; height:60px; resize:none; overflow-y:scroll;"
                :value="data.value"
                readonly
            ></b-form-textarea>
        </template>

        <template v-slot:cell(options)="data">
            <b-button variant="outline-warning" class="m-1" @click.prevent="triggerEditForm(data.item.id)" v-b-modal.ProductFormModal>🖉</b-button>
            <b-button variant="outline-danger" class="m-1" @click.prevent="triggerDelete(data.item.id)">✘</b-button>
        </template>

    </b-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: 'ProductList',
    data() {
        return {
            fields: [
                {
                    key: 'name',
                    label: 'Name',
                    thStyle: { 'min-width': '120px'}

                },
                {
                    key: 'image_url',
                    label: 'Image',
                    thStyle: { 'width': '240px'}
                },
                {
                    key: 'price',
                    formatter: (value) => value.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})
                },
                'stock',
                'options'
            ],
        }
    },
    created() {
        this.$store.dispatch('productList')
    },
    computed: mapGetters(['productListDesc']),
    methods: {
        ...mapActions(['productFind','productDelete']),
        triggerEditForm(id) {
            this.productFind(id)
        },
        triggerDelete(id) {
            Swal.fire({
                title: 'Delete this?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                })
                .then((result) => {
                if (result.value) {
                    this.productDelete(id)
                }
            })
        }
    },
}
</script>