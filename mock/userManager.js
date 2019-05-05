import Mock from 'mockjs'  //引入Mock

const List = []    //用户信息列表数据数组
const count = 50  //用户信息列表数据条数

for (let i = 0; i < count; i++) {  //循环产生数据
  List.push(Mock.mock(
    {
      "id":"@increment(1)",
      "account":"@protocol",
      "userName":"@cname",
      "Organization":"@province 分公司",
      "position|1":[{id:1,positionName:'组长'},{id:2,positionName:'主办'},{id:3,positionName:'助理'}],
      "employeeNumber":"@zip",
      "phone":/^1[3875][1-9]-\d{4}-\d{4}/,
      // "lastLoginTime":"@date",
      lastLoginTime: +Mock.Random.date('T'),  //模拟最后登录时间（年月日时分）
    }
  ))
}

export default [
  {
    url: '/userManager/list',  //用户管理获取数据后台请求接口（URL）
    type: 'get',   //请求方式
    response: () => {
      return {  //模拟后台返回的数据
        code: 20000,
        data: {
          total: List.length,  //模拟的后台返回数据列表总数
          items: List  //模拟的后台返回数据
        }
      }
    }
  },

  {
    url: '/userManager/create',  //用户管理新增数据后台请求接口（URL）
    type: 'post',   //请求方式post
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/userManager/update',  //用户管理编辑数据后台请求接口（URL）
    type: 'post',  //请求方式post
    response: _ => {
      return {
        code: 20000,  //模拟后台返回的数据
        data: 'success'   //返回的数据'success'
      }
    }
  },

]
