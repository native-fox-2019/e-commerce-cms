import Vue from "vue";
import Vuex from "vuex";
import { axios, errorHandler } from "../config/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    campaigns: [],
    admins: [],
    oneProduct: "",
    oneCampaign: "",
    oneAdmin: ""
  },
  mutations: {
    get(state, data) {
      state.products = data;
    },
    one(state, data) {
      state.oneProduct = data;
    },
    getCampaign(state, data) {
      state.campaigns = data;
    },
    oneCampaign(state, data) {
      state.oneCampaign = data;
    },
    getAdmin(state, data) {
      state.admins = data;
    },
    oneAdmin(state, data) {
      state.oneAdmin = data;
    }
  },
  actions: {
    async get({ commit }) {
      try {
        let { data } = await axios.get("/products", {
          headers: {
            access_token: localStorage.access_token
          }
        });
        commit("get", data);
      } catch (error) {
        errorHandler(error);
      }
    },
    async getCampaign({ commit }) {
      try {
        let { data } = await axios.get("/campaign", {
          headers: {
            access_token: localStorage.access_token
          }
        });
        commit("getCampaign", data);
      } catch (error) {
        errorHandler(error);
      }
    },
    async getAdmin({ commit }) {
      try {
        let { data } = await axios.get("/user", {
          headers: {
            access_token: localStorage.access_token
          }
        });
        commit("getAdmin", data);
      } catch (error) {
        errorHandler(error);
      }
    }
  },
  modules: {}
});
