import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list-tra-cuu',
      name: "list-tra-cuu",
      component: () => import ('@/components/ListForm')
    },

    {
      path: '/list-canh-tac',
      name: "list-canh-tac",
      component: () => import ('@/components/ListGuide')
    },

    {
      path: '/list-nong-dan',
      name: "list-nong-dan",
      component: () => import ('@/components/ListUsers')
    },


  ]
})
