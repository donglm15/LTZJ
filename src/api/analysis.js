import request from '@/utils/request'

export function fetchNewsList(query) {
  return request({
    url: 'http://localhost:8080/analysis/select',
    method: 'get',
    params: query
  })
}

export function del(query) {
  return request({
    url: 'http://localhost:8080/analysis/delete',
    method: 'get',
    params: query
  })
}

export function updateNews(query) {
  return request({
    url: 'http://localhost:8080/analysis/update',
    method: 'post',
    data: query,
    headers: { 'content-Type': 'application/json' }
  })
}

export function createNews(query) {
  return request({
    url: 'http://localhost:8080/analysis/insert',
    method: 'post',
    data: query,
    headers: { 'content-Type': 'application/json' }
  })
}
