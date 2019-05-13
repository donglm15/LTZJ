import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/PageProduce/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/PageProduce/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/PageProduce/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/PageProduce/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/PageProduce/update',
    method: 'post',
    data
  })
}
