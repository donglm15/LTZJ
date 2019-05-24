import request from '@/utils/request'

export function fetchAnnouncementList(query) {
  return request({
    url: '/admin/announcement/select',
    method: 'get',
    params: query
  })
}

export function delayMeeting(data) {
  return request({
    url: '/announcement/delay',
    method: 'post',
    data
  })
}
export function deleteAnnouncement(query) {
  return request({
    url: '/admin/announcement/delete',
    method: 'get',
    params: query
  })
}
// 取消
export function cancelMeeting(data) {
  return request({
    url: '/announcement/cancel',
    method: 'post',
    data
  })
}
// 新建
export function createAnnouncement(data) {
  return request({
    url: '/announcement/create',
    method: 'post',
    data
  })
}
// 会议室地点
export function meetingPlace() {
  return request({
    url: 'http://localhost:8080/announcement/getMeetingPlace',
    method: 'get'
    // query
  })
}

