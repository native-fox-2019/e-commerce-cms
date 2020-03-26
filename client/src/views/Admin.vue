<template>
  <div>
    <!-- NAV BAR -->
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button
              v-if="
                !edit &&
                  !addNew &&
                  this.$store.getters.getRole == 'admin' &&
                  !addBanner
              "
              type="button"
              class="btn btn-success"
              @click.prevent="changeAddTrue"
            >
              Add new product
            </button>
            <button
              v-if="
                !edit &&
                  !addNew &&
                  this.$store.getters.getRole == 'admin' &&
                  !addBanner
              "
              type="button"
              class="btn btn-warning ml-2"
              @click.prevent="changeAddBannerTrue"
            >
              Add new banner
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

    <div
      class="text-center"
      style="margin-top:100px;"
      v-if="!addNew && !edit && !addBanner"
    >
      <h1 style="font-family:monospace;">Admin Dashboard</h1>
    </div>

    <!-- BANNER CARD -->
    <Banner
      v-if="!addNew && !edit && !addBanner"
      @doneDeleting="getItems"
    ></Banner>

    <!-- PRODUCT CARD -->
    <hr />
    <h3 class="mt-5">
      <strong>
        Product List
      </strong>
    </h3>
    <div class="row p-5" v-if="!addNew && !edit && !addBanner">
      <div
        class="col-3"
        v-for="item in this.$store.state.itemList"
        :key="item.id"
      >
        <div class="card mb-3">
          <img
            class="card-img-top"
            :src="item.image_url"
            alt="Card image cap"
            style="width:100%; height:280px;"
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
    <Add v-if="addNew && !edit && !addBanner" @doneAdd="changeAddFalse"></Add>

    <!-- EDIT FORM COMPONENT-->
    <Edit
      v-if="edit && !addNew"
      :edit_prod="edit_prod"
      @notEdit="changeEditFalse"
      @doneEditing="changeEditFalse"
    ></Edit>

    <!-- ADD BANNER COMPONENT -->
    <addBanner
      v-if="addBanner && !addNew && !edit"
      @cancelAddBan="changeAddBanFalse"
      @doneAddBanner="changeAddBanFalse"
    ></addBanner>
  </div>
</template>
<script>
import Add from "../components/add.vue";
import Edit from "../components/edit.vue";
import Banner from "../components/banner.vue";
import addBanner from "../components/addBanner.vue";

export default {
  components: {
    Add,
    Edit,
    Banner,
    addBanner
  },
  created() {
    this.getItems();
    this.checkRole();
  },
  data() {
    return {
      addNew: false,
      edit: false,
      edit_prod: ``,
      id_edit: ``,
      addBanner: false
    };
  },
  methods: {
    doLogOut() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      this.$router.push({ name: "Front" });
    },
    getItems() {
      this.$store.dispatch("getItems");
    },
    changeAddFalse() {
      this.addNew = false;
      this.edit = false;
      this.addBanner = false;
      this.getItems();
    },
    changeAddTrue() {
      this.addNew = true;
      this.edit = false;
      this.addBanner = false;
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
      this.addBanner = false;
      this.getItems();
    },
    checkRole() {
      this.$store.commit("checkRole");
    },
    changeAddBannerTrue() {
      this.addBanner = true;
      this.edit = false;
      this.addNew = false;
    },
    changeAddBanFalse() {
      this.addBanner = false;
    }
  }
};
</script>
