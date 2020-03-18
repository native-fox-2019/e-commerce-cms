<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button
              v-if="!edit && !addNew"
              type="button"
              class="btn btn-success"
              @click.prevent="changeAddTrue"
            >
              Add new product
            </button>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <button class="btn btn-danger" @click="doLogOut">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
    <div class="text-center mt-5" v-if="!addNew && !edit">
      <h1 style="font-family:monospace;">Welcome To Amazon</h1>
    </div>
    <div class="row mt-5">
      <div class="col-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQEHqe2wMNeo8JlouoBVmyJLUlhgkDKq4JyzcqcsF_SPdHHOKGx"
          alt=""
        />
      </div>
      <div class="col-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQEHqe2wMNeo8JlouoBVmyJLUlhgkDKq4JyzcqcsF_SPdHHOKGx"
          alt=""
        />
      </div>
      <div class="col-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQEHqe2wMNeo8JlouoBVmyJLUlhgkDKq4JyzcqcsF_SPdHHOKGx"
          alt=""
        />
      </div>
      <div class="col-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQEHqe2wMNeo8JlouoBVmyJLUlhgkDKq4JyzcqcsF_SPdHHOKGx"
          alt=""
        />
      </div>
    </div>
    <div class="row mt-5" v-if="!addNew && !edit">
      <div
        class="col-2 mt-3 ml-5"
        v-for="item in this.$store.state.itemList"
        :key="item.id"
      >
        <div class="card" style="width: 18rem;">
          <img
            class="card-img-top"
            :src="item.image_url"
            alt="Card image cap"
            style="width:100%; height:350px;"
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">
              {{ item.price }}
            </p>
            <p class="card-text" style="font-size:14px; color:red;">
              Stock: {{ item.stock }}
            </p>
            <span class="btn btn-primary" @click.prevent="editForm(item.id)"
              >Edit</span
            >
            |
            <span class="btn btn-danger" @click.prevent="deleteProduct(item.id)"
              >Delete</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- ADD NEW FORM COMPONENT-->
    <Add v-if="addNew && !edit" @doneAdd="changeAddFalse"></Add>

    <!-- EDIT FORM COMPONENT-->
    <Edit
      v-if="edit && !addNew"
      :edit_prod="edit_prod"
      @notEdit="changeEditFalse"
      @doneEditing="changeEditFalse"
    ></Edit>
  </div>
</template>
<script>
import Add from "../components/add.vue";
import Edit from "../components/edit.vue";

export default {
  components: {
    Add,
    Edit
  },
  created() {
    this.getItems();
  },
  data() {
    return {
      addNew: false,
      edit: false,
      edit_prod: ``,
      id_edit: ``
    };
  },
  methods: {
    doLogOut() {
      localStorage.removeItem("access_token");
      this.$router.push({ name: "Login" });
    },
    getItems() {
      this.$store.dispatch("getItems");
    },
    changeAddFalse() {
      this.addNew = false;
      this.edit = false;
      this.getItems();
    },
    changeAddTrue() {
      this.addNew = true;
      this.edit = false;
    },
    deleteProduct(id) {
      this.$store.dispatch("deleteProduct", id);
    },
    editForm(id) {
      this.$store.state.itemList.forEach(i => {
        if (i.id === id) {
          this.edit_prod = i;
        }
      });
      (this.edit = true), (this.addNew = false);
    },
    changeEditFalse() {
      this.edit = false;
      this.addNew = false;
      this.getItems();
    }
  }
};
</script>
