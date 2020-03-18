<template>
    <div>
        <div class="product">
            <div class="product-content">
                <img v-bind:src="product.image_url" />
                <div class="description">
                    <p class="p-name">{{ product.name }}</p>
                    <p class="p-stock">Stock: {{ product.stock }}</p>
                    <p class="p-stock">Price: {{ product.price }}</p>
                    <div class="action">
                        <i class="fa fa-edit" v-on:click="editProductForm(product.id)"></i>
                        <i class="fa fa-trash" v-on:click="deleteProduct(product.id)"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from "axios";
export default {
    props: ["product"],
    data: () => {
        return {};
    },
    methods: {
        deleteProduct: function(id) {
            Axios({
                method: "delete",
                url: `${this.$store.state.rootUrl}/product/${id}`,
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
                .then(() => {
                    this.$store.commit("deleteData", id);
                })
                .catch(err => {
                    console.log(err.response);
                });
        },
        editProductForm: function(id) {
            Axios({
                method: "get",
                url: `${this.$store.state.rootUrl}/product/${id}`,
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
                .then(result => {
                    this.$store.state.product_temp = result.data.data;
                    this.$emit("editProductForm");
                })
                .catch(err => {
                    console.log(err.response);
                });
        }
    }
};
</script>
