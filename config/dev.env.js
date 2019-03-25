'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // ajax
  BASEURL: '"/dev/"',
  TIMEOUT: '5000',

  // router 子目录 
  ROUTER_BASE:'""',

})
