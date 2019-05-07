import Mock from 'mockjs'  //引入Mock

const List = []    //用户信息列表数据数组
const count = 50  //用户信息列表数据条数

for (let i = 0; i < count; i++) {  //循环产生数据
  List.push(Mock.mock(
    {
      id:"@increment(1)",  //序号
      account:"@protocol",  //用户名
      userName:"@cname",  //姓名
      Organization:"@province 分公司",   //组织机构
      "position|1":[{id:1,positionName:'组长'},{id:2,positionName:'主办'},{id:3,positionName:'助理'}],  //职位
      employeeNumber:"@zip",  //员工号
      phone:/^1[3875][1-9]-\d{4}-\d{4}/,  //电话
      // lastLoginTime:"@date",
      lastLoginTime: +Mock.Random.date('T'),  //模拟最后登录时间（年月日时分）
    }
  ))
}

export default [
  {
    url: '/userManager/list',  //用户管理获取数据后台请求接口（URL）
    type: 'get',   //请求方式
    //模拟后台分页的方式
    response: config => {
      const { position, userName, page = 1, limit = 20, sort, account, Organization, employeeNumber, phone } = config.query  //查询条件

      //过滤查询结果集(先过滤，再分页)
      // filter:循环所有的数据，return1，保留，return0，去除
      let mockList = List.filter(item => {  //过滤出查询后的数据
        //item.title.indexOf(title)等于-1说明不包含title
        if (position && item.position.positionName !== position) return false   //筛选职位
        if (userName && item.userName.indexOf(userName) < 0) return false  //筛选姓名
        if (account && item.account.indexOf(account) < 0) return false  //筛选用户名
        if (Organization && item.Organization.indexOf(Organization) < 0) return false  //筛选组织机构
        if (employeeNumber && item.employeeNumber.indexOf(employeeNumber) < 0) return false  //筛选员工号
        if (phone && item.phone.indexOf(phone) < 0) return false  //筛选电话
        return true
      })

      //排序
      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      //从总数据中过滤出当前页要显示的数据集
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {  //模拟后台返回的数据
        code: 20000,
        data: {
          total: mockList.length,  //模拟的后台返回数据列表总数
          items: pageList  //模拟的后台返回数据(已经后台分好页的数据)
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
