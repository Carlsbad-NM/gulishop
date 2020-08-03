// import() 是动态加载，内部传递的东西会打包成一个独立的小文件
const Home = () => import('@/pages/Home')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const Search = () => import('@/pages/Search')
const Detail = () => import('@/pages/Detail')
const AddCartSuccess = () => import('@/pages/AddCartSuccess')
const ShopCart = () => import('@/pages/ShopCart')
const Pay = () => import('@/pages/Pay')
const PaySuccess = () => import('@/pages/PaySuccess')
const Trade = () => import('@/pages/Trade')
const Center = () => import('@/pages/Center')
const MyOrder = () => import('@/pages/Center/MyOrder')
const GroupOrder = () => import('@/pages/Center/GroupOrder')


// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Trade from '@/pages/Trade'
// import Center from '@/pages/Center'
// import MyOrder from '@/pages/Center/MyOrder'
// import GroupOrder from '@/pages/Center/GroupOrder'

import store from '@/store'

export default [
  {
    path: '/center',
    component: Center,
    children: [
      {
        path: 'myorder',
        component: MyOrder
      },
      {
        path: 'grouporder',
        component: GroupOrder
      },
      {
        path: '',
        redirect: 'myorder'
      }
    ]
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      if (from.path === '/pay') {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/trade',
    component: Trade,
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopcart') {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess
  },
  {
    path: '/detail/:goodsId',
    component: Detail
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isHide: true
    },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (!store.state.user.userInfo.name) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      isHide: true
    }
  },
  {
    path: '/search/:keyword?',
    component: Search,
    name: 'search',
    // props: route => ({ keyword: route.params.keyword, keyword1: route.query.keyword1 })
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/communication',
    component: () => import('@/pages/Communication/Communication'),
    children: [
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'model',
        component: () => import('@/pages/Communication/ModelTest/ModelTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'attrs-listeners',
        component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'children-parent',
        component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'scope-slot',
        component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
          isHideFooter: true
        },
      }
    ],
  },
]

