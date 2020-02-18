import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/article',
      name: 'article',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/article.vue')
    },
    {
      path: '/page',
      name: 'page',
      children: [
        {
          path: '/article1',
          name: 'article1',
          component: () => import(/* webpackChunkName: "about" */ './views/pages/article1.vue')
        },
        {
          path: '/article2',
          name: 'article2',
          component: () => import(/* webpackChunkName: "about" */ './views/pages/article2.vue')
        },
        {
          path: '/article3',
          name: 'article3',
          component: () => import(/* webpackChunkName: "about" */ './views/pages/article3.vue')
        },
        {
          path: '/article4',
          name: 'article4',
          component: () => import(/* webpackChunkName: "about" */ './views/pages/article4.vue')
        },
        {
          path: '/post1',
          name: 'post1',
          component: () => import(/* webpackChunkName: "about" */ './views/pages/post1.vue')
        },
        {
          path: '/post2',
          name: 'post2',
          component: () => import(/* webpackChunkName: "about" */ './views/pages/post2.vue')
        },
        {
          path: '/post3',
          name: 'post3',
          component: () => import(/* webpackChunkName: "about" */ './views/pages/post3.vue')
        },
      ]
    },
    {
      path: '*',
      redirect: '/',
    }
  ]
})
