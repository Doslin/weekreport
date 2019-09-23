import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index2.vue'
import totalProgress from '../components/totalProgress.vue'
import profile from '../components/profile.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'index',
      path: '/',
      component: index
    },
    {
      name: 'index.html',
      path: '/index',
      component: index
    },
    {
      name: 'totalProgress',
      path: '/totalProgress',
      component: totalProgress
    },
    {
      name: 'profile',
      path: '/profile',
      component: profile
    }
  ]
})
