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


// 引用部分element组件
// import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(Element)


// 修改UI框架css样式
import '../my-theme/custom.css';  

import { Input, Select, Option, Form, FormItem, Checkbox, Upload  } from 'element-ui'
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Checkbox)
Vue.use(Upload)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
