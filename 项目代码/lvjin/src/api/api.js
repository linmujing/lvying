import { Promise } from 'es6-promise';
import axios from 'axios';


var instance = axios.create({
    // baseURL: 'http://localhost:8080/',          // 本地测试
    // baseURL: 'http://www.luyingjiaoyu.com/law-web-api/', // 正式环境
    // baseURL: 'http://114.115.133.96:8899/law-web-api/', // 测试环境
    baseURL: "/api/",                                      // 本地环境
    timeout: 20000,                                // 请求超时设置
    headers: { "Accept": "application/json" },
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
// 会员课程
export const getmyCourseList = params => { return instance.post(`/customer/course/getCourseList`, params ); };
/** 商户信息 **/
//商户注册
export const addMerchantInfo = params => { return instance.post(`merchant/info/addMerchantInfo`, params ); };
//商户登陆
export const merchantLogin = params => { return instance.post(`merchant/info/login`, params ); };
//商户密码找回
export const merchantResetPassWord = params => { return instance.post(`merchant/info/resetPassWord`, params ); };
//商户资料完善
export const saveMerchantInfo = params => { return instance.post(`merchant/info/saveMerchantInfo`, params ); };
//获取商户详细信息
export const getMerchantInfo = params => { return instance.post(`merchant/info/getMerchantInfo`, params ); };
//校验手机号
export const verifyMerchantPhone = params => { return instance.post(`merchant/info/verifyMerchantPhone`, params ); };

/** 产品 **/
//查看产品详情
export const getProductInfo = params => { return instance.post(`product/info/getProductInfo`, params ); };
//获取产品列表
export const getProductList = params => { return instance.post(`product/info/getProductList`, params ); };
//获取产品分类列表
export const getProductCatList = params => { return instance.post(`product/cat/getProductCatList`, params ); };
// 获取橱窗推荐
export const getProductShowCase = params => { return instance.post(`product/info/getShowCaseProduct`, params ); };
// 详情页点击横向导航获取内容列表
export const getSectionIndex = params => { return instance.post(`product/info/getProductSectionIndexContent`, params ); };
// // 获取橱窗列表
export const getProductShowCaseList = params => { return instance.post(`system/showCase/getShowCaseList`, params ); };

/** 系统接口 **/
//短信发送
export const sendSms = params => { return instance.post(`system/sms/sendSms`, params ); };
//获取轮播图列表
//  export const getBannerList = params => { return instance.post(`system/banner/getBannerList`, params ); };
//获取橱窗列表
export const getShowCaseList = params => { return instance.post(`system/showCase/getShowCaseList`, params ); };
//获取橱窗详情
export const getShowCase = params => { return instance.post(`system/showCase/getShowCase`, params ); };
//获取导航列表
export const getNavigationList = params => { return instance.post(`system/navigation/getNavigationList`, params ); };

/** 购物车 **/
//添加商品到购物车
export const addCart = params => { return instance.post(`customer/cart/addCart`, params ); };
//删除购物车中商品
export const deleteCart = params => { return instance.post(`customer/cart/deleteCart`, params ); };
//获取我的购物车列表
export const catGetCartList = params => { return instance.post(`customer/cart/getCartList`, params ); };

/** 地址 **/
//获取会员地址列表
export const getAddressList = params => { return instance.post(`customer/address/getAddressList`, params ); };
//保存地址
export const saveAddress = params => { return instance.post(`customer/address/saveAddress`, params ); };
//删除地址
export const deleteAddress = params => { return instance.post(`customer/address/deleteAddress`, params ); };

/** 优惠券 **/
//会员领取优惠券
export const addCoupont = params => { return instance.post(`customer/coupon/addCoupont`, params ); };
//获取我的优惠券列表
export const getCouponList = params => { return instance.post(`customer/coupon/getCouponList`, params ); };
//获取产品优惠券列表
export const getProductCoupon = params => { return instance.post(`coupon/info/getCouponList`, params ); };

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

/** 订单商品 **/
//获取订单商品
export const getOrderProductList = params => { return instance.post(`/order/product/getOrderProductList`, params ); };
//订单商品换货
export const orderProductExchange = params => { return instance.post(`/order/product/orderProductExchange`, params ); };

/** 订单评价 **/
//订单商品评价
export const addComment = params => { return instance.post(`order/comment/addComment`, params ); };
export const getProductCommentList = params => { return instance.post(`order/comment/getProductCommentList`, params ); };

/** 订单物流 **/
//查看订单物流
export const getOrderTrack = params => { return instance.post(`order/track/getOrderTrack`, params ); };

/** 订单交易 **/
// 阿里支付请求
export const aliPayRequest = params => { return instance.post(`/trade/aliPay/aliPay`, params ); };

// 微信支付回调
export const payBack = params => { return instance.post(`/trade/weixinPay/payBack`, params ); };
// 阿微信支付请求
export const appPerPay = params => { return instance.post(`/trade/weixinPay/appPerPay`, params ); };



