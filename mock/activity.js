import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id': '@increment',
    'people':'@integer(5,300)',
    "title":"@ctitle(6,25)",
    "content":"@cparagraph(10)",
    "address":"@county(true)",
    "type|1":['doing','do','done'],
    "tag":"",
    "prize|1":['爱奇艺视频月卡','爱奇艺视频年卡','200M流量包','1000M流量包','1G流量包','30元话费','50元话费','100元话费','中石油100元加油卡','中石油300元加油卡','腾讯视频年卡','腾讯视频月卡','腾讯视频季卡','爱奇艺视频季卡','京东E卡50元','京东E卡100元','京东E卡200元','京东E卡300元','微信红包20元','微信红包30元','微信红包50元','微信红包100元'],
    'startTime|1': ['2019-1-23 14:20','2019-2-15 9:43','2019-1-17 9:00','2019-3-8 13:00','2019-4-3 18:23','2019-5-4 14:20','2019-6-13 13:10','2019-7-21 10:00','2019-8-7 18:00'],
    'endTime|1': ['2019-8-13 11:00','2019-8-22 13:34','2019-10-15 15:10','2019-8-9 10:00','2019-10-28 12:00','2019-11-12 20:01',]
  }))
}




export default [

  {
    url: '/activity/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/activity/create',
    type: 'post',
    response: config => {
      //List.unshift(config)
      //List.unshift(config.data)
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/activity/list',
    type: 'get',
    response: config => {
      let {startTime, endTime, title, page , limit , type} = config.query
      let mockList = List.filter(item => {
        if (startTime && new Date(item.startTime) < new Date(startTime)) return false
        if (endTime && new Date(item.endTime) >= new Date(endTime)) return false
        if (title && item.title.indexOf(title) < 0) return false
        if (type && item.type !== type) return false
        return true
      })

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
]
