import Vue from 'vue'
import App from './App.vue'

// library
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import VueRouter from 'vue-router';

// router
import router from './router'

Vue.use(ElementUI, { locale });
Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
