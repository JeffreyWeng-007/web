import Vue from 'vue'
import Router from 'vue-router'
// import index from '../pages/Index/Index'
// import logistics from '../pages/Logistics/Logistics'
// import shoppingCart from '../pages/ShoppingCart/ShoppingCart'
// import chats from '../pages/Chats/Chats'
// import me from '../pages/Me/Me'
// import modal from './pages/Me/Modal'
// import navigationView from '../pages/NavigationView'

// 使用webpack模块打包，防止打包过大文件
// 使用此方式时，this.$route.matched[0].name取不到name
const index = r => require.ensure([], () => r(require('../pages/Index/Index')), 'index')
const logistics = r => require.ensure([], () => r(require('../pages/Logistics/Logistics')), 'logistics')
const shoppingCart = r => require.ensure([], () => r(require('../pages/ShoppingCart/ShoppingCart')), 'shoppingCart')
const chats = r => require.ensure([], () => r(require('../pages/Chats/Chats')), 'chats')
const me = r => require.ensure([], () => r(require('../pages/Me/Me')), 'me')
const modal = r => require.ensure([], () => r(require('../pages/Modal')), 'modal')
const navigationView = r => require.ensure([], () => r(require('../pages/NavigationView')), 'navigationView')
const guidelines = r => require.ensure([], () => r(require('../pages/Guidelines/Guidelines')), 'guidelines')

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/guidelines'
    // },
    // {
    //   path: '/guidelines',
    //   name: 'guidelines',
    //   component: guidelines
    // },
    {
      path: '/',
      redirect: '/navigationView'
    },
    {
      path: '/modal',
      name: 'modal',
      component: modal
    },
    {
      path: '/modal/:id',
      name: 'modal2',
      component: modal,
      props: true
    },
    {
      path: '/navigationView/',
      redirect: '/navigationView/index'
    },
    {
      path: '/navigationView/',
      name: 'navigationView',
      component: navigationView,
      children: [
        {
          path: '/navigationView/index',
          name: 'index',
          component: index,
        },
        {
          path: '/navigationView/logistics',
          name: 'logistics',
          component: logistics
        },
        {
          path: '/navigationView/shoppingCart',
          name: 'shoppingCart',
          component: shoppingCart
        },
        {
          path: '/navigationView/chats',
          name: 'chats',
          component: chats
        },
        {
          path: '/navigationView/me',
          name: 'me',
          component: me
        }
      ]
    }
  ]
})
