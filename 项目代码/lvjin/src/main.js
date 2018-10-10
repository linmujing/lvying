// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store/index'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import Qs from 'qs'


//解决ie9+浏览器兼容问题
import 'babel-polyfill';


// 引入接口配置文件
import * as api from './api/api'
Vue.prototype.$api = api
Vue.prototype.$axios = axios
Vue.prototype.$Qs = Qs

// 使用iview的 CSS
import 'iview/dist/styles/iview.css';
// 使用element的 CSS
import 'element-ui/lib/theme-chalk/index.css'
// 修改UI框架css样式
import '../my-theme/custom.css';

// 启用
Vue.use(Vuex)
Vue.use(iView);

// 引用部分element组件
// import Element from 'element-ui'
// Vue.use(Element)
import { Input, Select, Cascader, Option, Form, FormItem, Checkbox, Upload  } from 'element-ui'
Vue.use(Input)
Vue.use(Select)
Vue.use(Cascader)
Vue.use(Option)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Checkbox)
Vue.use(Upload)


// 视频播放器插件
import VideoPlayer from 'vue-video-player'

Vue.use(VideoPlayer);
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";

// 引入公共js
import common from '../commonFunction/common.js';
Vue.prototype.common = common


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
