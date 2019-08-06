import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from "./router";

import 'font-awesome/scss/font-awesome.scss';
import store from '@/views/vuex/store';
import axios from 'axios'
Vue.prototype.$axios = axios;
//Mock.boot();
//Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
