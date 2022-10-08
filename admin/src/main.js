import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './http'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = http

axios.defaults.withCredentials=true;
axios.defaults.headers.post['Content-Type'] = 'text/plain';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
