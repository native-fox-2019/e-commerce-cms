import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Swal from "sweetalert2";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemList: null,
    role: null,
  },
  getters: {
    getRole: (state) => {
      return state.role
    }
  },
  mutations: {
    populateItemList(state, payload) {
      state.itemList = payload;
    },
    checkRole(state) {
      state.role = localStorage.role
    }
  },
  actions: {
    getItems(context) {
      axios
        .get("https://peaceful-thicket-02203.herokuapp.com/products", {
          headers: { access_token: localStorage.access_token }
        })
        .then(data => {
          data.data.sort((a, b) => a.id - b.id);
          context.commit("populateItemList", data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addNewProduct(context, newProduct) {
      axios({
        method: "POST",
        url: "https://peaceful-thicket-02203.herokuapp.com/products/add",
        headers: { access_token: localStorage.access_token },
        data: {
          name: newProduct.name,
          image_url: newProduct.image_url,
          price: newProduct.price,
          stock: newProduct.stock
        }
      })
        .then(data => {
          console.log(data);
          Swal.fire({
            icon: "success",
            title: "Product added"
          });
          context.dispatch('getItems')
        })
        .catch(response => {
          Swal.fire({
            icon: "error",
            title: response.response.data.msg
          });
        });
    },
    deleteProduct(context, id) {
      axios({
        method: "DELETE",
        url: `https://peaceful-thicket-02203.herokuapp.com/products/delete/${id}`,
        headers: { access_token: localStorage.access_token }
      })
        .then(data => {
          console.log(data.msg)
          Swal.fire({
            icon: "success",
            title: "Product deleted"
          });
          context.dispatch('getItems')
        })
        .catch(response => {
          console.log(response);
        });
    },
    editProduct(context, payload) {
      axios({
        method: 'PUT',
        url: `https://peaceful-thicket-02203.herokuapp.com/products/edit/${payload.id}`,
        headers: { access_token : localStorage.access_token },
        data: {
          name : payload.name,
          image_url : payload.image_url,
          price : payload.price,
          stock : payload.stock
        }
      })
      .then(data => {
        console.log(data)
        Swal.fire({
          icon: 'success',
          title: 'Update successfull'
        })
        context.dispatch('getItems')
      })
      .catch(response => {
        console.log(response)
        Swal.fire({
          icon: 'error',
          title: 'Failed to update'
        })
      })
    }
  }
});
