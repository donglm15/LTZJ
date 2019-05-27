import request from '@/utils/request'

export function fetchInfoList(query) {
  return request({
    url: '/admin/info/list',
    method: 'get',
    params: query
  })
}

export function fetchInfoChart(query) {
  return request({
    url: '/admin/info/allInfo',
    method: 'get',
    params: query
  })
}

export function fetchTopInfo(query) {
  return request({
    url: '/admin/info/topInfo',
    method: 'get',
    params: query
  })
}

export function updateInfo(query) {
  return request({
    url: '/admin/info/updateByEdit',
    method: 'get',
    params: query
  })
}

export function deleteInfo(query) {
  return request({
    url: '/admin/info/delete',
    method: 'get',
    params: query
  })
}

export function getInfoById(id) {
  return request({
    url: '/admin/info/infoDetail/' + id,
    method: 'get'
    // params: id
  })
}

export function updateRead(query) {
  return request({
    url: '/admin/info/updateRead',
    method: 'get',
    params: query
  })
}

export function updateLikeFavo(query) {
  return request({
    url: '/admin/info/updateLikeFavo',
    method: 'get',
    params: query
  })
}

export function createInfo(query) {
  return request({
    url: '/admin/info/insert',
    method: 'post',
    data: query
  })
}
