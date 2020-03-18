import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Swal from "sweetalert2";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemList: null
  },
  mutations: {
    populateItemList(state, payload) {
      state.itemList = payload;
    },
    addNewProduct(state, payload) {
      state.itemList.push(payload);
    },
    deleteProduct(state, id) {
      let newest = []
      state.itemList.forEach(i => {
        if (i.id != id) {
          newest.push(i)
        }
      })
      state.itemList = newest
    }
  },
  actions: {
    getItems(context) {
      axios
        .get("http://localhost:3000/products", {
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
        url: "http://localhost:3000/products/add",
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
          context.commit("addNewProduct", newProduct);
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
        url: `http://localhost:3000/products/delete/${id}`,
        headers: { access_token: localStorage.access_token }
      })
        .then(data => {
          console.log(data.msg)
          Swal.fire({
            icon: "success",
            title: "Product deleted"
          });
          context.commit('deleteProduct', id)
        })
        .catch(response => {
          console.log(response);
        });
    },
    editProduct(context, payload) {
      axios({
        method: 'PUT',
        url: `http://localhost:3000/products/edit/${payload.id}`,
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
        this.edit = false
        Swal.fire({
          icon: 'success',
          title: 'Update successfull'
        })
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
