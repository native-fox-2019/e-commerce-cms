<template>
    <div>
        <div class="product">
            <div class="product-content">
                <img v-bind:src="product.image_url" />
                <div class="description">
                    <p class="p-name">{{product.name}}</p>
                    <p class="p-stock">Stock: {{product.stock}}</p>
                    <p class="p-stock">Price: {{product.price}}</p>
                    <div class="action">
                        <i class="fa fa-edit"></i>
                        <i class="fa fa-trash"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["product"],
    data: () => {
        return {};
    },
    methods: {}
};
</script>
