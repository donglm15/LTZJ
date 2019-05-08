import Mock from 'mockjs'

const noticeList = []
const count = 100

for (let i = 0; i < count; i++) {
  noticeList.push(Mock.mock({
    editIf: true,
    noticeIfRead: false,
    noticeId: '@increment',
    noticeDate: '2018-@date("MM-dd")',
    'noticePublish|1': [
      { publishId: 1, typePublish: '人力资源部' },
      { publishId: 2, typePublish: '办公厅' },
      { publishId: 3, typePublish: '综合部' },
      { publishId: 4, typePublish: '监察室' }],
    noticeTitle: '@ctitle(7,14)',
    noticeContent: '@cparagraph(25, 40)',
    noticeReadNum: '@integer(20, 300)',
    'noticeStatus|1': ['published', 'draft']
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
          items: noticeList
        }
      }
    }
  }
]

