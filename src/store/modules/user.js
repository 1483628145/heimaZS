// 导入相关方法
import { login } from '@/api/user'

// 导入token方法
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  // 防止命名冲突
  namespaced: true,
  state: {
    token: getToken() || ''
  },
  // 修改status数据
  mutations: {
    // 保存token
    setToken(state, token) {
      state.token = token
      setToken(token)
      // console.log(state.token)
    },

    // 删除VueX中的Token
    removeStateToken(state) {
      state.token = ''
    }
  },
  // 调用异步函数
  actions: {
    // 获取Token
    async getToken(context, data) {
      const { data: res } = await login(data)
      context.commit('setToken', res.token)
    },

    // 删除Token
    removeToken(context) {
      // 删除掉本地Token
      removeToken()
      context.commit('removeStateToken')
    }

  }
}
