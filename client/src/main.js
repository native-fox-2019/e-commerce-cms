import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import LoadScript from "vue-plugin-load-script";
import VueSidebarMenu from "vue-sidebar-menu";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

Vue.use(VueSidebarMenu);
Vue.use(LoadScript);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.loadScript("./vendor/animsition/js/animsition.min.js");
Vue.loadScript("./vendor/select2/select2.min.js");
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
