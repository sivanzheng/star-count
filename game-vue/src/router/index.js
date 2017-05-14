import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index/index'
import game from '@/components/game/game'
import gameover from '@/components/gameover/gameover'
Vue.use(Router)

 const router = new Router({
  routes: [
    {//首页路由
      path: '/index',
      name: 'index',//路径对应命名，可以使用命名路由
      component: index//命名和组件的name属性对应
    },
    {
      //游戏主页面路由
      path: '/starCount',
      name: 'main',
      component: game
    },
    {
      //游戏主页面路由
      path: '/gameover',
      name: 'endPage',
      component: gameover
    },
    { path: '/', redirect: '/index' },
    { path: '*', redirect: '/index' }
  ]
})

export default router