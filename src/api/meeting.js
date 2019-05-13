import request from '@/utils/request'

export function fetchMeetingList(query) {
  return request({
    url: '/meeting/list',
    method: 'get',
    params: query
  })
}

export function updateMeeting(data) {
  return request({
    url: '/meeting/update',
    method: 'post',
    data
  })
}

export function createMeeting(data) {
  return request({
    url: '/meeting/create',
    method: 'post',
    data
  })
}

