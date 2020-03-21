<template>
    <div>
        <h4 class="users-title">User List</h4>
        <div class="users-table">
            <table cellpadding="10px">
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <tr v-for="user in users" v-bind:key="user.id">
                        <td>{{user.id}}</td>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td v-if="user.is_admin">
                            <button
                                class="btn-simple"
                                v-bind:style="'background-color: #1d1d1d; border: 1px #23a8f2 solid;'"
                                v-on:click="removeMember(user.id, user.name)"
                            >Deactivate</button>
                        </td>
                        <td v-if="!user.is_admin">
                            <button
                                class="btn-simple"
                                v-bind:style="'background-color: rgb(170,170,170); border: 1px black solid; color: black;'"
                                v-on:click="addMember(user.id, user.name)"
                            >Activate</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import Axios from "axios";
import Swal from "sweetalert2";

export default {
    data: () => {
        return {
            addMemberId: "",
            removeMemberId: "",
            users: []
        };
    },
    methods: {
        listUser: function() {
            Axios({
                method: "get",
                url: `${this.$store.state.rootUrl}/user/listAll`,
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
                .then(result => {
                    this.users = result.data;
                })
                .catch(err => {
                    this.$store.dispatch("errorHandler", err.response);
                });
        },
        addMember: function(id, name) {
            Swal.fire({
                title: "Promote this user?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then(result => {
                if (result.value) {
                    Axios({
                        method: "patch",
                        url: `${this.$store.state.rootUrl}/user/addAdmin/${id}`,
                        headers: {
                            access_token: localStorage.getItem("access_token")
                        }
                    })
                        .then(() => {
                            this.listUser();
                            Swal.fire(
                                "Promoted!",
                                `${name} has been promoted to member.`,
                                "success"
                            );
                        })
                        .catch(err => {
                            this.$store.dispatch("errorHandler", err.response);
                        });
                }
            });
        },
        removeMember: function(id, name) {
            Swal.fire({
                title: "Demote this user?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then(result => {
                if (result.value) {
                    Axios({
                        method: "patch",
                        url: `${this.$store.state.rootUrl}/user/removeAdmin/${id}`,
                        headers: {
                            access_token: localStorage.getItem("access_token")
                        }
                    })
                        .then(() => {
                            this.listUser();
                            Swal.fire(
                                "Demoted!",
                                `${name} has been demoted to non-member.`,
                                "success"
                            );
                        })
                        .catch(err => {
                            this.$store.dispatch("errorHandler", err.response);
                        });
                }
            });
        }
    },
    created: function() {
        this.listUser();
    }
};
</script>