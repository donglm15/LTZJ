// import Mock from 'mockjs'
import { fetchNotice } from '@/api/notice'

// let noticeList1 = null
// const noticeList = []
// const count = 100

// for (let i = 0; i < count; i++) {
//   noticeList.push(Mock.mock({
//     editIf: true,
//     noticeIfRead: false,
//     noticeId: '@increment',
//     noticeDate: '@date',
//     'noticePublish|1': [
//       { publishId: 1, typePublish: '人力资源部' },
//       { publishId: 2, typePublish: '办公厅' },
//       { publishId: 3, typePublish: '综合部' }],
//     noticeTitle: '@ctitle(7,14)',
//     noticeContent: '@cparagraph(25, 40)',
//     noticeReadNum: '@integer(20, 300)',
//     'noticeStatus|1': ['published', 'draft']
//   }))
// }

const state = {
  notice: []
}

const mutations = {

}
const actions = {
  pushNotice({ commit }) {
    fetchNotice().then(response => {
      for (const v of response.data.items) {
        state.notice.push(v)
      }
    })
  },
  addNotice({ commit }, data) {
    state.notice.unshift(data)
  },
  updateNotice({ commit }, data) {
    for (const v of state.notice) {
      if (v.noticeId === data.noticeId) {
        const index = state.notice.indexOf(v)
        state.notice.splice(index, 1, data)
        break
      }
    }
  },
  deleteNotice({ commit }, row) {
    const index = state.notice.indexOf(row)
    state.notice.splice(index, 1)
  }
}
export default ({
  state,
  mutations,
  actions
})
