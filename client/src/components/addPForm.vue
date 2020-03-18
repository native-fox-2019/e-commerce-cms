<template>
    <div>
        <transition name="bounce">
            <div class="addModal modal" v-if="addModal">
                <div class="modal-content">
                    <div class="x" v-on:click="closeAddModal">+</div>

                    <div class="box-title">
                        <h4 class="addProduct-title">Add Product</h4>
                    </div>

                    <form v-on:submit.prevent="addProduct">
                        <div class="textbox">
                            <input
                                type="text"
                                id="addProduct-title"
                                placeholder="Product Name"
                                v-model="addProd_name"
                            />
                        </div>
                        <div class="textbox">
                            <input
                                type="text"
                                id="addProduct-desc"
                                placeholder="Image url"
                                v-model="addProd_image_url"
                            />
                        </div>
                        <div class="textbox wlabel">
                            <label for="stock">Stock</label>
                            <input
                                type="number"
                                id="addProduct-desc"
                                placeholder="Stock"
                                v-model="addProd_stock"
                            />
                        </div>
                        <div class="textbox wlabel">
                            <label for="price">Price</label>
                            <input
                                type="number"
                                id="addProduct-desc"
                                placeholder="Stock"
                                v-model="addProd_price"
                            />
                        </div>
                        <button id="addProduct-submit" class="submit-btn btn">Add</button>
                    </form>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import Axios from "axios";

export default {
    props: ["addModal"],
    data: () => {
        return {
            addProd_name: "",
            addProd_image_url: "",
            addProd_stock: 0,
            addProd_price: 0
        };
    },
    methods: {
        closeAddModal: function() {
            this.$emit("closeAddModal");
        },
        addProduct: function() {
            Axios({
                method: "post",
                url: `${this.$store.state.rootUrl}/product`,
                headers: {
                    access_token: localStorage.getItem("access_token")
                },
                data: {
                    name: this.addProd_name,
                    image_url: this.addProd_image_url,
                    stock: this.addProd_stock,
                    price: this.addProd_price
                }
            })
                .then(result => {
                    this.addProd_name = "";
                    this.addProd_image_url = "";
                    this.addProd_stock = 0;
                    this.addProd_price = 0;
                    this.$emit("closeAddModal");
                    this.$store.commit("addData", result.data.data);
                })
                .catch(err => {
                    console.log(err.response);
                    this.$store.dispatch("errorHandler", err.response);
                });
        }
    }
};
</script>