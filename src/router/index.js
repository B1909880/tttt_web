import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list-users',
      name: 'userView',
      component: () => import ('@/views/UserViews')
    },
    {
      path: '/list-search',
      name: 'searchView',
      component: () => import ('@/views/SearchViews')
    },
    {
      path: '/list-cultivateGuide',
      name: 'CultivateGuideViews',
      component: () => import ('@/views/CultivateGuideViews')
    },
  ]
})
