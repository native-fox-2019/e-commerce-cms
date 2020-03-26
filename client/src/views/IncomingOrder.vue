<template>
    <div class="incoming-order">
        <h4>Incoming Order</h4>
        <div class="order-table">
            <table cellpadding="10px">
                <thead>
                    <th>Order Code</th>
                    <th>Product Name</th>
                    <th>Qty</th>
                    <th>Status</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <tr v-for="incomingOrder in incomingOrders" v-bind:key="incomingOrder.id">
                        <td>{{incomingOrder.code}}</td>
                        <td>{{incomingOrder.Product.name}}</td>
                        <td>{{incomingOrder.qty}}</td>
                        <td>{{incomingOrder.status}}</td>
                        <td
                            v-if="incomingOrder.status == 'Waiting confirmation'"
                            class="action-col"
                            v-on:click="confirmOrder(incomingOrder.id)"
                        >Confirm</td>
                        <td
                            v-if="incomingOrder.status == 'On Process'"
                            class="action-col"
                        >On Process</td>
                        <td v-if="incomingOrder.status == 'Finished'" class="action-col">Finished</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
    name: "IncomingOrder",
    data() {
        return {
            incomingOrders: []
        };
    },
    methods: {
        getAllIncomingOrder: function() {
            this.$store.state.isLoading = true;
            axios({
                method: "get",
                url: `${this.$store.state.rootUrl}/order/seller/incomingOrder`,
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
                .then(result => {
                    this.$store.state.isLoading = false;
                    this.incomingOrders = result.data;
                })
                .catch(err => {
                    this.$store.dispatch("errorHandler", err.response);
                });
        },
        confirmOrder: function(order_id) {
            Swal.fire({
                title: "Confirm this order?",
                text:
                    "make sure the stock is sufficient, and the product will be sent immediately",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                if (result.value) {
                    this.$store.state.isLoading = true;
                    axios({
                        method: "patch",
                        url: `${this.$store.state.rootUrl}/order/seller/confirmOrder/${order_id}`,
                        headers: {
                            access_token: localStorage.getItem("access_token")
                        }
                    })
                        .then(() => {
                            this.$store.state.isLoading = false;
                            this.getAllIncomingOrder();
                        })
                        .catch(err => {
                            this.$store.dispatch("errorHandler", err.response);
                        });
                }
            });
        }
    },
    created() {
        this.getAllIncomingOrder();
    }
};
</script>