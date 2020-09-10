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
      component: () => import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackChunkName: "about" */
        './views/About.vue'
      )
    },
    {
      path: '/article',
      name: 'article',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackChunkName: "about" */
        './views/article.vue'
      )
    },
    {
      path: 'pages/article1',
      name: 'article1',
      component: () => import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackChunkName: "about" */
        './views/pages/article1.vue'
      )
    },
    {
      path: 'pages/article2',
      name: 'article2',
      component: () => import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackChunkName: "about" */
        './views/pages/article2.vue'
      )
    },
    {
      path: 'pages/article3',
      name: 'article3',
      component: () => import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackChunkName: "about" */
        './views/pages/article3.vue'
      )
    },
    {
      path: 'pages/article4',
      name: 'article4',
      component: () => import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackChunkName: "about" */
        './views/pages/article4.vue'
      )
    },
    {
      path: 'pages/post1',
      name: 'post1',
      component: () => import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackChunkName: "about" */
        './views/pages/post1.vue'
      )
    },
    {
      path: 'pages/post2',
      name: 'post2',
      component: () => import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackChunkName: "about" */
        './views/pages/post2.vue'
      )
    },
    {
      path: '*',
      redirect: '/',
    }
  ]
})
