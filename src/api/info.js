import request from '@/utils/request'

export function fetchInfoList(query) {
  return request({
    url: 'http://localhost:8080/info/list',
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

export function updateInfo(query) {
  return request({
    url: 'http://localhost:8080/info/updateByEdit',
    method: 'get',
    params: query
  })
}

export function deleteInfo(query) {
  return request({
    url: 'http://localhost:8080/info/delete',
    method: 'get',
    params: query
  })
}

export function getInfoById(id) {
  return request({
    url: 'http://localhost:8080/info/infoDetail/' + id,
    method: 'get'
    // params: id
  })
}

export function updateRead(query) {
  return request({
    url: 'http://localhost:8080/info/updateRead',
    method: 'get',
    params: query
  })
}

export function updateLikeFavo(query) {
  return request({
    url: 'http://localhost:8080/info/updateLikeFavo',
    method: 'get',
    params: query
  })
}

export function createInfo(query) {
  return request({
    url: 'http://localhost:8080/info/insert',
    method: 'post',
    data: query
  })
}
