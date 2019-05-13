import request from '@/utils/request'

export function fetchInfoList(query) {
  return request({
    url: '/info/list',
    method: 'get',
    params: query
  })
}

export function fetchInfoChart(query) {
  return request({
    url: '/info/chart',
    method: 'get',
    params: query
  })
}

export function updateInfo(data) {
  return request({
    url: '/info/update',
    method: 'post',
    data
  })
}

export function createInfo(data) {
  return request({
    url: '/info/create',
    method: 'post',
    data
  })
}
