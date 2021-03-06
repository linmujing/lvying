// initial state
/* 用户数据存储 */

  const state = {
    // 微信登录 appid
    appid:'wxf3264a02ac5f662f', //测试
    // appid:'wx628cdd1c88e826cf', //正式环境

    // 用户数据
    ciphone: localStorage.getItem("ciphone"),
    cicode: localStorage.getItem("cicode"),
    ciProfileUrl: localStorage.getItem("ciProfileUrl"),
    ciSex: localStorage.getItem("ciSex"),
    ciIntroduce: localStorage.getItem("ciIntroduce"),
    ciname: localStorage.getItem("ciname"),
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
        state.ciname = n.ciName;
        state.cicode = n.ciCode;
        state.ciProfileUrl = n.ciProfileUrl;
        state.ciSex = n.ciSex;
        state.ciIntroduce = n.ciIntroduce;

        localStorage.setItem("ciphone", n.ciPhone)
        localStorage.setItem("ciname", n.ciName)
        localStorage.setItem("cicode", n.ciCode)
        localStorage.setItem("ciProfileUrl", n.ciProfileUrl)
        localStorage.setItem("ciSex", n.ciSex)
        localStorage.setItem("ciIntroduce", n.ciIntroduce)
  
    },
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
