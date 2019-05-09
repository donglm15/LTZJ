import request from '@/utils/request'

export function fetchNotice(query) {
  return request({
    url: '/notice/noticeList',
    method: 'get',
    params: query
  })
}

