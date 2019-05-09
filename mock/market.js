import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    jobPlace: '@county(true)',
    employName: '@ctitle',
    reviewer: '@first',
    title: '@ctitle(5, 15)',
    importance: '@integer(1, 5)',
    'type|1': ['管理序列', '技术序列', '支撑序列', '市场序列'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    remark: '@cparagraph',
    'salary|1': ['5000-8000', '8000-10000', '10000-12000', '12000-15000'],
    'education|1': ['本科', '大专', '硕士', '博士'],
    'experience|1': ['不限', '一年以上', '两年以上', '五年以上'],
    recruitment: '@integer(1, 12)',
    'welfare|1': ['免费班车  定期体检  包住  带薪年假  六险二金','五险一金  年底双薪  加班补助'],
    company: '@cparagraph',
    // comment_disabled: true,
    // pageviews: '@integer(300, 5000)',
    // image_uri,
    // platforms: ['a-platform']
  }))
}

export default [
  {
    url: '/market/list',
    type: 'get',
    response: config => {
      const { importance, type,title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
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
    url: '/market/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const market of List) {
        if (market.id === +id) {
          return {
            code: 20000,
            data: market
          }
        }
      }
    }
  },

  {
    url: '/market/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/market/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/market/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

