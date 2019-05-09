// /** When your routing table is too long, you can split it into small modules **/
//
// import Layout from '@/layout'
//
// const userRouter = {
//   path: '/news',
//   component: Layout,
//   alwaysShow: true,
//   redirect: '/member/index',
//   name: 'member',
//   meta: {
//     title: 'member',
//     icon: 'user',
//     roles: ['admin']
//   },
//   children: [
//     {
//       path: 'index',
//       component: () => import('@/views/member/index'),
//       name: 'memberList',
//       meta: { title: 'memberList', roles: ['admin'] }
//     }
//   ]
// }
// export default userRouter
