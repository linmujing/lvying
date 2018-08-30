import { Promise } from 'es6-promise';
import axios from 'axios';
import qs from 'qs'

//域名
axios.defaults.baseURL = 'http://localhost:8080/api';           // 测试

//测试例子
export const addUser = params => { return axios.get(`/xxx/xxx`, params ); };
