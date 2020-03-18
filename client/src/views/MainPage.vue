<template>
    <div>
        <div class="product-container">
            <h4>Your Catalogue</h4>
            <div class="product-list">
                <div
                    class="product-flex"
                    v-for="product in $store.state.products"
                    v-bind:key="product.id"
                >
                    <ProductCard v-bind:product="product" v-on:editProductForm="editProductForm"></ProductCard>
                </div>
            </div>
        </div>
        <div class="add-product-btn" v-on:click="addProductForm">+</div>

        <editPForm v-bind:editModal="editModal" v-on:closeEditModal="closeEditModal"></editPForm>
        <addPForm v-bind:addModal="addModal" v-on:closeAddModal="closeAddModal"></addPForm>
    </div>
</template>
<script>
import ProductCard from "../components/ProductCard";
import addPForm from "../components/addPForm";
import editPForm from "../components/editPform";

export default {
    name: "Product",
    components: {
        ProductCard,
        addPForm,
        editPForm
    },
    data: () => {
        return {
            addModal: false,
            editModal: false
        };
    },
    methods: {
        getAllProduct: function() {
            this.$store.dispatch("getAllProduct");
        },
        addProductForm: function() {
            this.addModal = true;
        },
        closeAddModal: function() {
            this.addModal = false;
        },
        editProductForm: function() {
            console.log(this.$store.state.product_temp);
            this.editModal = true;
        },
        closeEditModal: function() {
            this.editModal = false;
        }
    },
    created: function() {
        if (localStorage.getItem("access_token")) {
            this.getAllProduct();
        }
    }
};
</script>
