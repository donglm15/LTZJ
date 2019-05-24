import request from '@/utils/request'

export function fetchMeetingList(query) {
  return request({
    // url: '/meeting/list',
    url: '/admin/meeting/select',
    method: 'get',
    params: query
  })
}

export function deleteMeeting(query) {
  return request({
    url: '/admin/meeting/delete',
    method: 'get',
    params: query
  })
}

export function updateMeeting(data) {
  return request({
    url: '/admin/meeting/update',
    method: 'post',
    data
  })
}

export function createMeeting(data) {
  console.log(data)
  return request({
    url: '/admin/meeting/saveOne',
    method: 'post',
    data
  })
}

