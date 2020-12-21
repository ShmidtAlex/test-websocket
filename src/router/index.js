import Vue from 'vue'
import VueRouter from 'vue-router'
import InteractiveDesktop from '../views/InteractiveDesktop.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'InteractiveDesktop',
    component: InteractiveDesktop,
  },
  {
    path: '/websocket',
    name: 'WebsocketConnection',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/WebsocketConnection.vue')
  },
  {
    path: '/chartjs',
    name: 'ChartjsBased',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ChartjsBased.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
