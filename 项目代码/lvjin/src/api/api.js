import { Promise } from 'es6-promise';
import axios from 'axios';
import qs from 'qs'


var instance = axios.create({
    // baseURL: 'http://localhost:8080/',          // 本地测试
    // baseURL: 'http://114.115.133.96:8899/law-web-api/', // 正式环境
    baseURL: "/api/",                                      // 本地环境
    timeout: 5000,                                // 请求超时设置
    headers: { "Accept": "application/json" }
});


//测试例子
export const addUser = params => { return instance.get(`/xxx/xxx`, params ); };

/** 会员信息 **/ 
//会员注册  
export const addCustomerInfo = params => { return instance.post(`customer/info/addCustomerInfo`, params ); };
//会员登陆(密码和短信登陆公用)
export const login = params => { return instance.post(`customer/info/login`, params ); };
//会员密码找回
export const resetPassWord = params => { return instance.post(`customer/info/resetPassWord`, params ); };
//会员信息保存
export const saveCustomerInfo = params => { return instance.post(`customer/info/saveCustomerInfo`, params ); };
//校验手机号
export const verifyCiPhone = params => { return instance.post(`customer/info/verifyCiPhone`, params ); };

/** 商户信息 **/ 
//商户注册  
export const addMerchantInfo = params => { return instance.post(`merchant/info/addMerchantInfo`, params ); };
//商户登陆
export const merchantLogin = params => { return instance.post(`merchant/info/login`, params ); };
//商户密码找回
export const merchantResetPassWord = params => { return instance.post(`merchant/info/resetPassWord`, params ); };
//商户资料完善
export const saveMerchantInfo = params => { return instance.post(`merchant/info/saveMerchantInfo`, params ); };
//校验手机号
export const verifyMerchantPhone = params => { return instance.post(`merchant/info/verifyMerchantPhone`, params ); };

/** 产品 **/ 
//查看产品详情
export const getProductInfo = params => { return instance.post(`product/info/getProductInfo`, params ); };
//获取产品列表
export const getProductList = params => { return instance.post(`product/info/getProductList`, params ); };
//获取产品分类列表
export const getProductCatList = params => { return instance.post(`product/cat/getProductCatList`, params ); };

/** 系统接口 **/ 
//短信发送
export const sendSms = params => { return instance.post(`system/sms/sendSms`, params ); };
//获取轮播图列表
export const getBannerList = params => { return instance.post(`system/banner/getBannerList`, params ); };

/** 购物车 **/ 
//添加商品到购物车
export const addCat = params => { return instance.post(`customer/cat/addCat`, params ); };
//删除购物车中商品
export const deleteCat = params => { return instance.post(`customer/cat/deleteCat`, params ); };
//获取我的购物车列表
export const catGetCouponList = params => { return instance.post(`customer/cat/getCouponList`, params ); };

/** 地址 **/ 
//获取会员地址列表
export const getAddressList = params => { return instance.post(`customer/address/getAddressList`, params ); };
//保存收获地址
export const saveAddress = params => { return instance.post(`customer/address/saveAddress`, params ); };

/** 优惠券 **/ 
//会员领取优惠券
export const addCoupont = params => { return instance.post(`customer/coupon/addCoupont`, params ); };
//获取我的优惠券列表
export const getCouponList = params => { return instance.post(`customer/coupon/getCouponList`, params ); };

/** 订单接口 **/ 
//生成订单
export const addOrderInfo = params => { return instance.post(`order/info/addOrderInfo`, params ); };
//取消订单
export const cancleOrder = params => { return instance.post(`order/info/cancleOrder`, params ); };
//获取订单可用优惠券
export const getOrderCoupon = params => { return instance.post(`order/info/getOrderCoupon`, params ); };
//获取订单用优惠券后价格
export const getOrderCouponAmount = params => { return instance.post(`order/info/getOrderCouponAmount`, params ); };
//查看订单
export const getOrderInfo = params => { return instance.post(`order/info/getOrderInfo`, params ); };
//获取订单列表
export const getOrderList = params => { return instance.post(`order/info/getOrderList`, params ); };
//删除订单
export const hideOrder = params => { return instance.post(`order/info/hideOrder`, params ); };

/** 订单评价 **/ 
//订单商品评价
export const addComment = params => { return instance.post(`order/comment/addComment`, params ); };

/** 订单物流 **/ 
//查看订单物流
export const getOrderTrack = params => { return instance.post(`order/track/getOrderTrack`, params ); };



