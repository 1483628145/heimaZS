// 路由守卫
import router from './router'
import store from './store'

// 路由前置守卫
router.beforeEach((to, from, next) => {
  /*
  to 跳转的页面
  from 从那个页面来的
  next 放行 next('/强制跳转的页面')
  */
  const token = store.state.user.token

  if (token) {
    // 有token
    if (to.path === '/login') {
      // 去login 强制到主页
      next('/')
    } else {
      // 去其他页面 直接放行
      next()
    }
  } else {
    // 没有token
    if (to.path === '/login' || to.path === '/404') {
    // 去login/404
      next()
    } else {
      // 去其他页面 强制跳转到登录页面
      next('/login')
    }
  }
})

