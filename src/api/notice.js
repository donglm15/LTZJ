import request from '@/utils/request'

export function fetchNoticeBack(query) {
  return request({
    url: '/admin/notice/list',
    method: 'get',
    params: query
  })
}

export function publishNoticeBack(query) {
  return request({
    url: '/admin/notice/publish',
    method: 'get',
    params: query
  })
}

export function deleteNoticeOne(id) {
  return request({
    url: `/admin/notice/delete?noticeId=${id}`,
    method: 'get'
  })
}

export function getOneNotice(id) {
  return request({
    url: `/admin/notice/getOneNotice?noticeId=${id}`,
    method: 'get'
  })
}

export function insertNoticeOne(query) {
  return request({
    url: `/admin/notice/insert`,
    method: 'post',
    data: query,
    headers: { 'content-Type': 'application/json' }
  })
}

export function updateNoticeOne(query) {
  return request({
    url: `/admin/notice/update`,
    method: 'post',
    data: query,
    headers: { 'content-Type': 'application/json' }
  })
}

export function updateStatusOne(id, status) {
  return request({
    url: `/admin/notice/updateStatus?noticeId=${id}&noticeStatus=${status}`,
    method: 'get',
    headers: { 'content-Type': 'application/x-www.form-urlencoded' }
  })
}

export function noticeStatistics(first, second) {
  return request({
    url: `/admin/notice/noticeStatistics?noticeFirst=${first}&noticeSecond=${second}`,
    method: 'get'
  })
}

export function downloadOneNotice(id) {
  return request({
    url: `/admin/notice/getOneNotice?noticeId=${id}`,
    method: 'get',
    responseType: 'blob'
  })
}
