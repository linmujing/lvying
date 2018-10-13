// 加入购物车

import store from ".."
import api from './../../api/index'
import qs from 'qs'

const state = {
    // 商品信息
    productCount:0,
    ciCode:"",
    productCode:"",

    // 消息提示
    successState:1,
    failState:1,

}

const getters = {
    
}

const actions = {
  // 点击购物车
  addCartTo({commit},newState){

    store.commit('cart/addToCart',newState);

    api.addCart(qs.stringify(newState)).then((res)=>{

      console.log(res)

      if(res.data.code===200){

        store.commit('cart/successMsg', 1);

      }else{

        store.commit('cart/failMsg', 1);

      }
    })
  
  },
}

const mutations = {
    // 保存添加购物车状态
    addToCart(state,s){

      state.ciCode=s.ciCode;
      state.productCode=s.productCode;
      state.productCount=s.productCount;

    },
    // 成功更改
    successMsg(state, n){
      
      state.successState = state.successState + n;

    },
    // 失败更改
    failMsg(state, n){

      state.failState = state.failState + n;

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
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }