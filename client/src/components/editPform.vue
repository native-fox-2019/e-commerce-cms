<template>
    <div>
        <transition name="bounce">
            <div class="editModal modal" v-if="editModal">
                <div class="modal-content">
                    <div class="x" v-on:click="closeEditModal">+</div>

                    <div class="box-title">
                        <h4 class="editProduct-title">Edit Product</h4>
                    </div>

                    <form v-on:submit.prevent="editProduct">
                        <div class="textbox">
                            <input
                                type="text"
                                id="editProduct-title"
                                placeholder="Product Name"
                                v-model="$store.state.product_temp.name"
                            />
                        </div>
                        <div class="textbox">
                            <input
                                type="text"
                                id="editProduct-desc"
                                placeholder="Image url"
                                v-model="$store.state.product_temp.image_url"
                            />
                        </div>
                        <div class="textbox wlabel">
                            <label for="stock">Stock</label>
                            <input
                                type="number"
                                id="editProduct-desc"
                                placeholder="Stock"
                                v-model="$store.state.product_temp.stock"
                            />
                        </div>
                        <div class="textbox wlabel">
                            <label for="price">Price</label>
                            <input
                                type="number"
                                id="editProduct-desc"
                                placeholder="Stock"
                                v-model="$store.state.product_temp.price"
                            />
                        </div>
                        <button id="editProduct-submit" class="submit-btn btn">Update</button>
                    </form>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import Axios from "axios";
export default {
    props: ["editModal"],
    data: () => {
        return {
            editProd_name: "",
            editProd_image_url: "",
            editProd_stock: "",
            editProd_price: ""
        };
    },
    methods: {
        closeEditModal: function() {
            this.$emit("closeEditModal");
        },
        editProduct: function() {
            Axios({
                method: "put",
                url: `${this.$store.state.rootUrl}/product/${this.$store.state.product_temp.id}`,
                headers: {
                    access_token: localStorage.getItem("access_token")
                },
                data: {
                    name: this.$store.state.product_temp.name,
                    image_url: this.$store.state.product_temp.image_url,
                    stock: this.$store.state.product_temp.stock,
                    price: this.$store.state.product_temp.price
                }
            })
                .then(() => {
                    this.$store.commit(
                        "editData",
                        this.$store.state.product_temp
                    );
                    this.$emit("closeEditModal");
                })
                .catch(err => {
                    console.log(err.response);
                });
        }
    }
};
</script>