// 基础数据


export default {
  state: {
    isLogin: false,
  },
  mutations: {
    updateUser (state, user) {
      state.login = true
    },
    removeUser (state) {
      state.login = false
    }
  },
  actions: {
    getUser ({ commit }) {
      // 获取用户登录信息
      console.log('getUser')
    }
  },
  
}