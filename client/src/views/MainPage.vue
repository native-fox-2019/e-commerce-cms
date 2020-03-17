<template>
    <div>
        <div class="product-container">
            <h4>Your Catalogue</h4>
            <div class="product-list">
                <div class="product-flex" v-for="product in products" v-bind:key="product.id">
                    <ProductCard v-bind:product="product"></ProductCard>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from "axios";
import ProductCard from "../components/ProductCard";
const rootUrl = "http://localhost:3000";

export default {
    name: "Product",
    components: {
        ProductCard
    },
    data: () => {
        return {
            products: [
                {
                    name: "GUNDAM RG 15 1/144 EXIA",
                    image_url:
                        "https://ecs7.tokopedia.net/img/cache/700/product-1/2016/9/27/4499750/4499750_4071eefa-10b3-4a7f-b8de-07032b2a49c6.jpg",
                    price: 375000,
                    stock: 20
                },
                {
                    name: "RG Astray Gold Frame Amatsu Mina",
                    image_url:
                        "https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/22/4499750/4499750_37aae095-c9c6-4d69-8ad6-4df63556d77d_1196_702.jpg",
                    price: 420000,
                    stock: 20
                },
                {
                    name: "RG Freedom Gundam",
                    image_url:
                        "https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/24/4499750/4499750_b2636bae-928d-40be-a6a6-11330c1aaac2.jpg",
                    price: 330000,
                    stock: 20
                },
                {
                    name: "GUNDAM RG 15 1/144 EXIA",
                    image_url:
                        "https://ecs7.tokopedia.net/img/cache/700/product-1/2016/9/27/4499750/4499750_4071eefa-10b3-4a7f-b8de-07032b2a49c6.jpg",
                    price: 375000,
                    stock: 20
                },
                {
                    name: "RG Astray Gold Frame Amatsu Mina",
                    image_url:
                        "https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/22/4499750/4499750_37aae095-c9c6-4d69-8ad6-4df63556d77d_1196_702.jpg",
                    price: 420000,
                    stock: 20
                },
                {
                    name: "RG Freedom Gundam",
                    image_url:
                        "https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/24/4499750/4499750_b2636bae-928d-40be-a6a6-11330c1aaac2.jpg",
                    price: 330000,
                    stock: 20
                }
            ]
        };
    },
    methods: {
        getAllProduct: function() {
            Axios({
                method: "get",
                url: `${rootUrl}/product`,
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
                .then(result => {
                    console.log(result.data);
                })
                .catch(err => {
                    console.log(err.response);
                });
        }
    }
};
</script>