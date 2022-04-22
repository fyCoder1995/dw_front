
import request from '@/utlis/request'

// 登录
export function login(params) {
  return request({
    url: '/oauth/token',
    method: 'post',
    params
  })
}

// 获取用户信息
export function getInfo(params) {
  return request({
    url: '/user/checkUserName',
    method: 'get',
    params
  })
}

// 退出登录接口
export function logout() {
  return request({
    url: '/login_out',
    method: 'post'
  })
}

