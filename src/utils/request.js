// 导入axios
import axios from 'axios'
// 方法导入
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

// axios.create 创建一个axios实例 可以通过实例来请求接口
// 依然可以使用 request.get request.post 来请求接口
const request = axios.create({
  // 基地址 每个接口都相同的部分 后面的接口都会自动拼接到一起
  baseURL: 'https://api-hmzs.itheima.net/v1',
  // 超时时间
  timeout: 5000 // request timeout
})

// 请求拦截器  ---请求之前做的事
request.interceptors.request.use(
  config => {
    // config 就是请求数据 不能省略return
    // 通常配置token 在请求的时候在请求头添加token
    const token = store.state.user.token
    // 有token的情况 在请求头前添加 token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    // 发生错误的时候
    return Promise.reject(error)
  }
)

// 响应拦截器  ---拿到数据后做的事情
// 数据返回的时候第一个到达的位置
request.interceptors.response.use(
  response => {
    // 成功的时候拿到的数据
    // console.log(response.data.data)
    return response.data.data
  },
  error => {
    // 失败的时候处理
    // 在请求回来的数据是失败的时候可以统一处理
    // console.dir(error)

    // 判断 Token超时 跳转到登录页
    if (error.response.status === 401) {
      // token超时
      // 清除本地token
      store.dispatch('user/removeToken')
      // 跳转到登录
      router.push('/login')
    }

    Message.error(error.response.data.msg)
    return Promise.reject(error)
  }
)

export default request
