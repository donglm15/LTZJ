import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/market/list',
    method: 'get',
    params: query
  })
}

export function fetchDetail(id) {
  return request({
    url: '/market/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/market/pv',
    method: 'get',
    params: { pv }
  })
}

export function createMarket(data) {
  return request({
    url: '/market/create',
    method: 'post',
    data
  })
}

export function updateMarket(data) {
  return request({
    url: '/market/update',
    method: 'post',
    data
  })
}
