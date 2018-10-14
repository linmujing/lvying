// initial state
/* 个人中心页面状态管理 */

  const state = {
    // 个人中心导航
    navIndex: 0 ,
    // 记录地址为空和不为空
    addressState: 0,

  }
  
  // getters
  const getters = {
    
  }
  
  // actions
  const actions = {
   
  }
  
  // mutations
  const mutations = {
    
    // 个人中心导航
    NavIndex(state, n) {  state.navIndex = n; },
    // 当地址为空时
    setAddressState(state, n){  state.addressState = n  },

  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }