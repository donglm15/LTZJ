import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin/member/select',
    method: 'get',
    params: query
  })
}
export function deleteMember(id) {
  return request({
    url: '/admin/member/delete/' + id,
    method: 'get'
  })
}

export function fetchMember(id) {
  return request({
    url: '/admin/member/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchMemberChart(query) {
  return request({
    url: '/admin/member/chart',
    method: 'get',
    params: query
  })
}

export function createMember(query) {
  return request({
    url: '/admin/member/insert',
    method: 'post',
    data: query,
    headers: { 'content-Type': 'application/json' }
  })
}

export function updateMember(query) {
  return request({
    url: '/admin/member/update',
    method: 'post',
    data: query,
    headers: { 'content-Type': 'application/json' }
  })
}
