import Vue from 'vue'
import Vuex from 'vuex'
import personCenter from './modules/personCenter'
import userData from './modules/userData'
import cart from './modules/cart'
Vue.use(Vuex)

// 创建 store 实例
export default new Vuex.Store({
  modules: {
    cart,
    personCenter,
    userData

  }
})