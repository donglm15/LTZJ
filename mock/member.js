import Mock from 'mockjs'

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: '@date',
    author: '@cname',
    title: '@ctitle(3, 5)',
    content: '@cparagraph(10,50)',
    'type|1': ['1', '2', '3', '4'],
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    platforms: ['a-platform']
  }))
}

export default [
  {
    url: '/member/list',
    type: 'get',
    response: config => {
      const {  content, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (content && item.content !== content) return false
        // if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        // if (content && item.content.indexOf(content) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/member/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const member of List) {
        if (member.id === +id) {
          return {
            code: 20000,
            data: member
          }
        }
      }
    }
  },

  {
    url: '/member/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/member/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

