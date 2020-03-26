import Vue from 'vue';
import VueSidebarMenu from 'vue-sidebar-menu';
import App from './App.vue';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import store from './store';
import router from './router';

Vue.use(VueSidebarMenu);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
