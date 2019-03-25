// 路由加载模块
import index from '@/page/index'

import home from './model/home.js'
import market from './model/market.js'

console.log(home)
let routes = [
  {path: '/', component: index, children: home, },
  {path: '/market', component: index, children: market },
  {path: '*', redirect: '/'}
]


export default routes