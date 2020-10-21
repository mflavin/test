import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import(
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackChunkName: "forms" */
  './views/Home.vue'
);

const Offline = () => import(
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackChunkName: "forms" */
  './views/Offline.vue'
);

Vue.use(Router)

export default new Router({
  /*
    NOTE: While offline, if you add a hash before routes, offline seems to work while mode: history
    Example
    https://dev-forms.myqsrsoft.com/dashboard  --> https://dev-forms.myqsrsoft.com/#/dashboard
    https://mflavin.github.io/test/about       --> https://mflavin.github.io/test/#/about
  */
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/offline',
      name: 'Offline',
      component: Offline,
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackChunkName: "forms" */
        './views/About.vue'
      ),
      children: [
        {
          path: '/cheese',
          name: 'cheese',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(
            /* webpackMode: "lazy" */
            /* webpackPrefetch: true */
            /* webpackChunkName: "forms" */
            './views/article.vue'
          ),
          props: true,
        },
        {
          path: '/apple',
          name: 'apple',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(
            /* webpackMode: "lazy" */
            /* webpackPrefetch: true */
            /* webpackChunkName: "forms" */
            './views/about.vue'
          ),
          props: true,
        },
        {
          path: '/post',
          name: 'post',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(
            /* webpackMode: "lazy" */
            /* webpackPrefetch: true */
            /* webpackChunkName: "forms" */
            './views/pages/post2.vue'
          ),
          props: true,
        },
      ]
    },
    {
      path: '/article',
      name: 'Article',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackChunkName: "forms" */
        './views/article.vue'
      )
    },
    {
      path: '/pages/article1',
      name: 'article1',
      component: () => import(
        './views/pages/article1.vue'
      )
    },
    {
      path: '/pages/article2',
      name: 'article2',
      component: () => import(
        './views/pages/article2.vue'
      )
    },
    {
      path: '/pages/article3',
      name: 'article3',
      component: () => import(
        './views/pages/article3.vue'
      )
    },
    {
      path: '/pages/article4',
      name: 'article4',
      component: () => import(
        './views/pages/article4.vue'
      )
    },
    {
      path: '/pages/post1',
      name: 'post1',
      component: () => import(
        './views/pages/post1.vue'
      )
    },
    {
      path: '/pages/post2',
      name: 'post2',
      component: () => import(
        './views/pages/post2.vue'
      )
    },
    {
      path: '*',
      redirect: '/',
    },
  ]
})
