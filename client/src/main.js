import 'bootstrap/dist/css/bootstrap.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueSweetalert2 from 'vue-sweetalert2';

import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueSweetalert2);
// If you don't need the styles, do not connect


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
