import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'admin/market/select',
    method: 'get',
    params: query
  })
}
export function createMarket(query) {
  return request({
    url: 'admin/market/create',
    method: 'post',
    data: query,
    headers: { 'content-Type': 'application/json' }
  })
}
export function updateMarket(query) {
  return request({
    url: 'admin/market/update',
    method: 'post',
    data: query,
    headers: { 'content-Type': 'application/json' }
  })
}
export function deleteMarket(query) {
  return request({
    url: `admin/market/delete/${query}`,
    method: 'delete',
    data: query
  })
}

