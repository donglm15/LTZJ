import Mock from 'mockjs'

// const List = []
// const count = 50
// for (let i = 0; i < count; i++) {
//   List.push(Mock.mock({
//     'id': '@increment',
//     'date|1': ['2019-05-05', '2019-05-06', '2019-05-07', '2019-05-08'],
//     'product': '@ctitle(3,5)',
//     'regionType|1': [{ id: 1, typeName: '福州' },
//       { id: 2, typeName: '厦门' },
//       { id: 3, typeName: '泉州' },
//       { id: 4, typeName: '漳州' },
//       { id: 5, typeName: '宁德' },
//       { id: 6, typeName: '莆田' },
//       { id: 7, typeName: '南平' },
//       { id: 8, typeName: '三明' },
//       { id: 9, typeName: '龙岩' }
//     ],
//     'value1': '@float(5, 90, 1, 1)',
//     'value2': '@integer(50,300)',
//     'tratio': '@float(-15, 50, 2, 2)',
//     'hratio': '@float(-10, 25, 2, 2)'
//   }))
// }
export default [
  {
    // url: 'analysis/select',
    type: 'get',
    response: config => {
      const { date, regionType, product, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (date && item.date < date[0] || item.date > date[1]) return false
        if (product && item.product.indexOf(product) < 0) return false
        if (regionType && item.regionType.id !== regionType) return false
        return true
      })
      function sortKey(array, key) {
        return array.sort(function(a, b) {
          const x = a[key]
          const y = b[key]
          return ((x < y) ? -1 : (x > y) ? 1 : 0)
        })
      }
      if (sort === '+date') {
        sortKey(mockList, 'date')
        // mockList = mockList.reverse()
      }
      if (sort === '-date') {
        sortKey(mockList, 'date').reverse()
        // mockList = mockList.reverse()
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
    // url: '/analysis/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    // url: '/analysis/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
