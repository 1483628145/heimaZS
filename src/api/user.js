// 在默认导入和导出的时候并不需要名字一样
import request from '@/utils/request'

/**
 * 登录接口
 *
 * **/
export function login(data) {
  // 拿到的是一个 Promise对象的结果
  return request({
    url: '/park/login',
    method: 'POST',
    data
  })
}
