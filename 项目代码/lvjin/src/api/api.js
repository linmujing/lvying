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

//获取商品列表
export const getProductInfo = params => { return instance.post(`product/info/getProductInfo`, params ); };
//查看商品详情
export const getProductList = params => { return instance.post(`/product/info/getProductList`, params ); };