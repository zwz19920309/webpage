import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// import Vant from 'vant';
// import 'vant/lib/index.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
import QS from 'qs'


Vue.prototype.qs = QS;
Vue.prototype.$axios = axios;
// Vue.use(Vant);
Vue.use(ElementUI)
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
