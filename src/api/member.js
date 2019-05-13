import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/member/list',
    method: 'get',
    params: query
  })
}

export function fetchMember(id) {
  return request({
    url: '/member/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchMemberChart(query) {
  return request({
    url: '/member/chart',
    method: 'get',
    params: query
  })
}
// export function fetchPv(pv) {
//   return request({
//     url: '/member/pv',
//     method: 'get',
//     params: { pv }
//   })
// }

export function createMember(data) {
  return request({
    url: '/member/create',
    method: 'post',
    data
  })
}

export function updateMember(data) {
  return request({
    url: '/member/update',
    method: 'post',
    data
  })
}
