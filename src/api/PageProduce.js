import request from '@/utils/request'

export function fetchPageProduceList(query) {
  return request({
    url: '/admin/pageProduce/list',
    method: 'get',
    params: query
  })
}

export function deleteNoticeOne(id) {
  return request({
    url: `/admin/pageProduce/delete?produce_id=${id}`,
    method: 'get'
  })
}

// export function getOnePageProduce(id) {
//   return request({
//     url: `/admin/pageProduce/getOnePageProduce?produce_id=${id}`,
//     method: 'get'
//   })
// }

export function insertPageProduceOne(query) {
  return request({
    url: `/admin/pageProduce/insert`,
    method: 'post',
    data: query,
    headers: { 'content-Type': 'application/json' }
  })
}
export function updatePageProduceOne(query) {
  return request({
    url: `/admin/pageProduce/update`,
    method: 'post',
    data: query,
    headers: { 'content-Type': 'application/json' }
  })
}

