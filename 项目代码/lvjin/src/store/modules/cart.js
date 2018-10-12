import store from ".."
import api from './../../api/index'
import qs from 'qs'
const state = {
    productCount:0,
    ciCode:"",
    productCode:""
}
const getters = {
    
}
const actions = {
  addCartTo({commit},newState){
    store.commit('addToCart',newState);
    console.log(newState);
    api.addCart(qs.stringify(state)).then((res)=>{
      if(res.data.code===200){
        console.log("加入购物车成功！")
      }

    })
  
  },
}
const mutations = {
    addToCart(state,s){
      state.ciCode=s.ciCode;
      state.productCode=s.productCode;
      state.productCount=s.productCount;
    },
  //   addCartNum(state,s){
  //     if(state.id===s){
  //       state.productCount++;
  //     }
        
  //   },
  //   decreaseCartNum(state,s){
  //     if(state.id===s){
  //       if(state.productCount<=1){
  //         state.productCount=1;
  //      }else{
  //        state.productCount--;
  //      }
  //     }
      
  // }

  }
  export default {
    state,
    getters,
    actions,
    mutations
  }