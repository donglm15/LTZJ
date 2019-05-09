import request from '@/utils/request'

export function fetchActivityList(query) {
  return request({
    url: '/activity/list',
    method: 'get',
    params: query
  })
}

export function updateActivities(data) {
  return request({
    url: '/activity/update',
    method: 'post',
    data
  })
}

export function createActivity(data) {
  return request({
    url: '/activity/create',
    method: 'post',
    data
  })
}
