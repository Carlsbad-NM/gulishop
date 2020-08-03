import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const service = axios.create({
  baseURL: '/api',  // 配置基础路径
  timeout: 10000,  //和超时限制
});

// 请求拦截器
// 请求拦截器内部一般不会处理错误的信息
service.interceptors.request.use(config => {
  //开启我们的进度条
  NProgress.start()

  // 在请求头当中添加用户的临时id，让每个ajax请求都带着这个userTempId
  let userTempId = store.state.user.userTempId
  if (userTempId) {
    config.headers.userTempId = userTempId
  }

  // 添加用户登录过后的token信息，为了找到用户登录后的相关信息
  let token = store.state.user.userInfo.token
  if (token) {
    config.headers.token = token
  }

  //config是发送请求的配置对象，必须处理完返回这个配置对象
  return config
});

// 响应拦截器
service.interceptors.response.use(response => {
  // 停止进度条
  NProgress.done();
  // 返回响应的时候,直接返回响应的data
  return response.data
}, error => {
  // 停止进度条
  NProgress.done();
  alert('请求出错' + error.message || '未知错误')
  // 以后不允许用户继续处理：终端promise链
  return new Promise(() => { }) // 返回pending状态的promise中断
  // 允许用户继续对错误进行处理
  // return Promise.reject(error)
})

export default service