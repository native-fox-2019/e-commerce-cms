<template>
    <b-modal
        id="modal-add"
        ref="modal"
        title="Add new stock"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
        >
        <form ref="form" @submit.stop.prevent="createData">
            <b-form-group
            :state="addState"
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
            >
                <b-form-input
                    id="name-input"
                    v-model="nameAdd"
                    :state="addState"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
            :state="addState"
            label="Image url"
            label-for="image-input"
            invalid-feedback="Image is required"
            >
                <b-form-input
                    id="image-input"
                    v-model="imageAdd"
                    :state="addState"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
            :state="addState"
            label="Price"
            label-for="price-input"
            invalid-feedback="Price is required"
            >
                <b-form-input
                    id="price-input"
                    v-model="priceAdd"
                    :state="addState"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
            :state="addState"
            label="Stock"
            label-for="stock-input"
            invalid-feedback="Stock is required"
            >
                <b-form-input
                    id="stock-input"
                    v-model="stockAdd"
                    :state="addState"
                    required
                ></b-form-input>
            </b-form-group>
        </form>
    </b-modal>
</template>
<script>
import axios from 'axios';

export default {
    props: ['showData'],
    data(){
        return {
            endpoint: 'http://localhost:3000',
            addState: null,
            nameAdd: null,
            imageAdd: null,
            priceAdd: null,
            stockAdd: null
        }
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.addState = valid;
            return valid;
        },

        resetModal() {
            this.nameAdd = '';
            this.imageAdd = '';
            this.priceAdd = '';
            this.stockAdd = '';
            this.addState = null;
        },

        handleOk(bvModalEvt) {

            bvModalEvt.preventDefault();
        
            this.createData();
        },

        createData() {
  
            if (!this.checkFormValidity()) {
                return;
            }
            
            axios({
                method: 'post',
                url: `${this.endpoint}/products`,
                headers: {token: localStorage.getItem('token')},
                data: {
                    name: this.nameAdd,
                    image_url: this.imageAdd,
                    price: this.priceAdd,
                    stock: this.stockAdd
                }
            })
                .then(()=>{ 
                    this.$store.dispatch('getData');
                })
                .catch(err=>{
                    console.log(err);
                })

        
            this.$nextTick(() => {
                this.$bvModal.hide('modal-add')
            })
        }
    }
}
</script>