import request from '@/utils/request'

export function login(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: process.env.VUE_APP_BASE_API + '/user/logout',
    method: 'post'
  })
}
