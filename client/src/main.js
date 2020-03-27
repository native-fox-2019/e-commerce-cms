import Vue from 'vue';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

//  Vue Sweet Alert //
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Vue Modal //
import VModal from 'vue-js-modal';

import store from './store';
import App from './App.vue';
// Install BootstrapVue and icon components plugin //
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VModal);

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;
new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
