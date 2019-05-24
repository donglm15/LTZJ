import request from '@/utils/request'

export function fetchNewsList(query) {
  return request({
    url: '/admin/analysis/select',
    method: 'get',
    params: query
  })
}

export function del(query) {
  return request({
    url: '/admin/analysis/delete',
    method: 'get',
    params: query
  })
}

export function updateNews(query) {
  return request({
    url: '/admin/analysis/update',
    method: 'post',
    data: query,
    headers: { 'content-Type': 'application/json' }
  })
}

export function createNews(query) {
  return request({
    url: '/admin/analysis/insert',
    method: 'post',
    data: query,
    headers: { 'content-Type': 'application/json' }
  })
}
