// initial state
/* 用户数据存储 */

  const state = {
    // 用户数据
    UserData: {} ,
    SupplierData: {}
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
    // 保存提供商数据
    saveSupplierData(state, n) {

      state.SupplierData = n;

    },
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
