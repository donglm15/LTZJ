import request from '@/utils/request' // 引入ajax请求的函数

export function fetchUserList(query) { // 对外封装出获取用户列表的函数
  return request({
    url: '/admin/userManager/select',
    method: 'get',
    params: query
  })
}

export function createArticle(data) { // 新增数据
  return request({
    url: '/admin/userManager/saveOne',
    method: 'post',
    data
  })
}

export function updateArticle(data) { // 更新数据（编辑）
  return request({
    url: '/admin/userManager/update',
    method: 'post',
    data
  })
}
