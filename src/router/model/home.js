// 独立加载
const index = () => import('@/page/home/index');


export default [
  {
    // 首页
    path: '/',
    name: 'index',
    meta: {
      title: 'index'
    },
    component: index
  }
]
