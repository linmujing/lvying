import Vue from 'vue'
import Vuex from 'vuex'
import personCenter from './modules/personCenter'

Vue.use(Vuex)

// 创建 store 实例
export default new Vuex.Store({
  modules: {

    personCenter,

  }
})