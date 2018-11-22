import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from "./router";
import Mock from './mock';
import 'font-awesome/scss/font-awesome.scss'
Mock.boot();
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
