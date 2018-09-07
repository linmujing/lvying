// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'

//解决ie9+浏览器兼容问题
import 'babel-polyfill';

// 使用iview的 CSS
import 'iview/dist/styles/iview.css';    

Vue.use(iView);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
