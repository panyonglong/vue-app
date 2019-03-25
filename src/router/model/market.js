// 独立加载
const index = () => import('@/page/market/index');


export default [
  {
    // 首页
    path: '/',
    name: 'market-index',
    meta: {
      title: 'market-index'
    },
    component: index
  }
]
