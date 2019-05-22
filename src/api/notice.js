import request from '@/utils/request'

export function fetchNoticeBack(query) {
  return request({
    url: 'http://localhost:8080/notice/list',
    method: 'get',
    params: query
  })
}

export function publishNoticeBack(query) {
  return request({
    url: 'http://localhost:8080/notice/publish',
    method: 'get',
    params: query
  })
}

export function deleteNoticeOne(id) {
  return request({
    url: `http://localhost:8080/notice/delete?noticeId=${id}`,
    method: 'get'
  })
}

export function getOneNotice(id) {
  return request({
    url: `http://localhost:8080/notice/getOneNotice?noticeId=${id}`,
    method: 'get'
  })
}

export function insertNoticeOne(query) {
  return request({
    url: `http://localhost:8080/notice/insert`,
    method: 'post',
    data: query,
    headers: { 'content-Type': 'application/json' }
  })
}

export function updateNoticeOne(query) {
  return request({
    url: `http://localhost:8080/notice/update`,
    method: 'post',
    data: query,
    headers: { 'content-Type': 'application/json' }
  })
}

export function updateStatusOne(id, status) {
  return request({
    url: `http://localhost:8080/notice/updateOne?noticeId=${id}&noticeStatus=${status}`,
    method: 'get',
    headers: { 'content-Type': 'application/x-www.form-urlencoded' }
  })
}
