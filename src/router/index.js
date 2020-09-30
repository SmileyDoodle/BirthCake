import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import LoginPage from '../views/LoginPage.vue'
// import SigninPage from '../views/SigninPage.vue'
// import InformationPage from '../views/InformationPage.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LoginPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
  },
  {
    path: '/signin',
    name: 'SigninPage',
    component: () => import('../views/SigninPage.vue')
  },
  {
    path: '/information',
    name: 'InformationPage',
    component: () => import('../views/InformationPage.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
