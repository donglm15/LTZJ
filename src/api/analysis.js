import request from '@/utils/request'

export function fetchNewsList(query) {
  return request({
    url: '/analysis/list',
    method: 'get',
    params: query
  })
}
export function updateNews(data) {
  return request({
    url: '/analysis/update',
    method: 'post',
    data
  })
}

export function createNews(data) {
  return request({
    url: '/analysis/create',
    method: 'post',
    data
  })
}
