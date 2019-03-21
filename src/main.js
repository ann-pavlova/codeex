import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store/index';

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  el: '#app',
  store,
  validations: {},
  render: h => h(App)
});
