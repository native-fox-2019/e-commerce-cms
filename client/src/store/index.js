import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products:[
      {id:1,product:'Nike',price:'10000',stock:10},
      {id:2,product:'Nike 2',price:'10000',stock:10},
      {id:3,product:'Nike 3',price:'10000',stock:10}
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});
