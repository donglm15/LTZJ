import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id': '@increment',
    'meetingID': '@zip',
    'meetingTheme': '@ctitle',
    'department': '@ctitle',
    'user': '@cname()',
    'meetingDate': +Mock.Random.date('T'),
    'meetingStatus|1': [
      { id: 1, statusName: '草稿' },
      { id: 2, statusName: '已通知' },
      { id: 3, statusName: '延期' },
      { id: 4, statusName: '取消' }
    ],
    'meetingPosition|1': [
      { id: 1, positionName: '7楼会议室' },
      { id: 2, positionName: '8楼会议室' },
      { id: 3, positionName: '9楼会议室' },
      { id: 4, positionName: '10楼会议室' },
      { id: 5, positionName: '11楼会议室' },
      { id: 6, positionName: '15楼会议室' }
    ]
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
    url: '/announcement/list',
    type: 'get',
    // 后台分页
    response: config => {
      const { page = 1, limit = 20, meetingID, meetingTheme, department, meetingPosition, meetingDate, meetingStatus, sort } = config.query

      let mockList = List.filter(item => {
        if (meetingID && item.meetingID.indexOf(meetingID) < 0) return false
        if (meetingTheme && item.meetingTheme.indexOf(meetingTheme) < 0) return false
        if (department && item.department.indexOf(department) < 0) return false
        if (meetingPosition && item.meetingPosition.positionName !== meetingPosition) return false
        if (meetingStatus && item.meetingStatus.statusName !== meetingStatus) return false
        if (meetingDate && item.meetingDate < new Date(meetingDate[0]) || item.meetingDate > new Date(meetingDate[1])) return false

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
    url: '/announcement/delay',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/announcement/cancel',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/announcement/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }

]
