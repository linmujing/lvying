// initial state
/* 用户数据存储 */

  const state = {
    // 用户数据
    ciphone: window.sessionStorage.getItem("ciphone"),
    cicode: window.sessionStorage.getItem("cicode"),

    
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

        state.ciphone = n.ciPhone;
        state.cicode = n.ciCode;

        window.sessionStorage.setItem("ciphone", n.ciPhone)
        window.sessionStorage.setItem("cicode", n.ciCode)
  
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
