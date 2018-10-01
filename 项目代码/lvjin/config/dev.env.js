'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
// 本地测试
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: "/api/"
})
