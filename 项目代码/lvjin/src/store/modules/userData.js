// initial state
/* 用户数据存储 */

  const state = {
    // 用户数据
    UserData: {} ,
  }
  
  // getters
  const getters = {
    
  }
  
  // actions
  const actions = {
   
  }
  
  // mutations
  const mutations = {
    // 保存用户数据
    saveUserData(state, n) {

        state.UserData = n;
  
    },
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }