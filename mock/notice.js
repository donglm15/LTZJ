import Mock from 'mockjs'

const noticeList = []
const count = 100

for (let i = 0; i < count; i++) {
  noticeList.push(Mock.mock({
    editIf: true,
    noticeIfRead: false,
    noticeId: '@increment',
    noticeDate: '@date',
    'noticePublish|1': [
      { publishId: 1, typePublish: '人力资源部' },
      { publishId: 2, typePublish: '办公厅' },
      { publishId: 3, typePublish: '综合部' }],
    noticeTitle: '@ctitle(7,14)',
    noticeContent: '@cparagraph(7, 20)',
    noticeReadNum: '@integer(20, 300)',
    'status|1': ['published', 'draft']
  }))
}

export default [
  {
    url: '/notice/noticeList',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: {
          total: noticeList.length,
          items: noticeList
        }
      }
    }
  },
  {
    url: '/notice/createNotice',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/notice/updateNotice',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
