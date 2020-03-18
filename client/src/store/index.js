import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemList: null
  },
  mutations: {
    populateItemList(state, payload) {
      state.itemList = payload
    }
  },
  actions: {
    getItems(context) {
      axios
        .get("http://localhost:3000/products", {
          headers: { access_token: localStorage.access_token }
        })
        .then(data => {
          data.data.sort((a,b) => a.id - b.id)
          context.commit('populateItemList', data.data)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
})
