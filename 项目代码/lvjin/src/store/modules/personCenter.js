// initial state
/* 个人中心页面状态管理 */

  const state = {
    // 个人中心导航
    navIndex: 0 ,
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
    NavIndex(state, n) {

        state.navIndex = n;
  
    },
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }