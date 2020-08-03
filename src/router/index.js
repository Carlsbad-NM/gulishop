import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// 解决多次触发push或者repalce，报错的问题
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, onResolved, onRejected) {
  // originPush.call目的是让VueRouter实例化对象去调用
  //如果不加，那就是window在调用
  if (onResolved === undefined && onRejected === undefined) {
    return originPush.call(this, location).catch(() => { })
  } else {
    return originPush.call(this, location, onResolved, onRejected)
  }
}
VueRouter.prototype.replace = function (location, onResolved, onRejected) {
  if (onResolved === undefined && onRejected === undefined) {
    return originReplace.call(this, location).catch(() => { })
  } else {
    return originReplace.call(this, location, onResolved, onRejected)
  }
}

import routes from '@/router/routes'
import store from '@/store'

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 全局前置路由导航守卫
router.beforeEach((to, from, next) => {
  let targerPath = to.path
  if (targerPath.startsWith('/pay') || targerPath.startsWith('/trade') || targerPath.startsWith('/center')) {
    // 判断用户是否登录
    if (store.state.user.userInfo.name) {
      next()
    } else {
      // 在登录的路径后面添加之前想要去的路径
      next('/login?redirect=' + targerPath)
    }
  } else {
    next()
  }
})

export default router