import Mock from 'mockjs'

const List = []
const count = 50
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    "id|+1":'@increment',
    "imgUrl":Mock.Random.image('800x300', Mock.Random.color(),'image'),
    "title":"@ctitle",
    "content":Mock.Random.cparagraph(50,200),
    "previewContent":"",
    "date":"@date",
    "infoType|1":[{id:1,typeName:'中标信息'},{id:2,typeName:'行业热点'},{id:3,typeName:'公司政策'}],
    "read":"@integer(20,300)",
    "like":"@integer(20,300)",
    "favorite":"@integer(20,300)"
  }))
}

export default [
  {
    url: '/info/list',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: {
          total: List.length,
          items: List
        }
      }
    }
  },
  {
    url: '/info/chart',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: {
          items: List
        }
      }
    }
  },
  {
    url: '/info/update',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/info/create',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
