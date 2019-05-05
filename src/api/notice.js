import request from '@/utils/request'

export function fetchNotice(query) {
  return request({
    url: '/notice/noticeList',
    method: 'get',
    params: query
  })
}

export function createNotice(data) {
  return request({
    url: '/notice/createNotice',
    method: 'post',
    data
  })
}

export function updateNotice(data) {
  return request({
    url: '/notice/updateNotice',
    method: 'post',
    data
  })
}
