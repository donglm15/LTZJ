import request from '@/utils/request'

export function fetchActivityList(query) {
  return request({
    url: '/admin/activity/select',
    method: 'get',
    params: query
  })
}

export function updateActivities(query) {
  return request({
    url: '/admin/activity/update',
    method: 'get',
    params: query
  })
}

export function createActivity(query) {
  return request({
    url: '/admin/activity/insert',
    method: 'post',
    data: query,
    headers: { 'content-Type': 'application/json' }
  })
}

export function deleteActivity(query) {
  return request({
    url: '/admin/activity/delete',
    method: 'get',
    params: query
  })
}

// export function deleteActivity(query) {
//   return request({
//     url: 'http://localhost:8080/activity/delete',
//     method: 'post',
//     data: query,
//     headers: { 'content-Type': 'application/x-www.form-urlencoded' }
//   })
// }
