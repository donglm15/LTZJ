import Mock from 'mockjs'

const List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id': '@increment',
    'meetingName': '@ctitle',
    'meetingPosition': '@ctitle',
    'peopleNum|20-200': 200,
    'ifMore|1': [{ id: 1, typeName: '是' }, { id: 2, typeName: '否' }],
    'ifOpen|1': [{ id: 1, openName: '启用' }, { id: 2, openName: '未启用' }]
  }))
}

export default [
  // 前台分页
  // {
  //   url: '/meeting/list',
  //   type: 'get',
  //   response: () => {
  //     return {
  //       code: 20000,
  //       data: {
  //         total: List.length,
  //         items: List
  //       }
  //     }
  //   }
  // },

  // 后台分页
  {
    url: 'http://localhost:8080/meeting/list',
    type: 'get',
    // 后台分页
    response: config => {
      const { page = 1, limit = 20, meetingName, sort, meetingPosition, peopleNum } = config.query

      let mockList = List.filter(item => {
        if (meetingName && item.meetingName.indexOf(meetingName) < 0) return false
        // if (peopleNum && item.peopleNum < peopleNum) return false
        return true
      })

      // 排序
      if (sort === '-id') { mockList = mockList.reverse() }

      // 从总数据中过滤出当前页要显示的数据集
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
    url: 'http://localhost:8080/meeting/delete',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: 'http://localhost:8080/meeting/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: 'http://localhost:8080/meeting/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }

]
